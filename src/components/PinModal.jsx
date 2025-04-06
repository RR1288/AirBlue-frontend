import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './PinModal.module.css';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import { useNotifications } from '../components/NotificationProvider';
import { useNavigate } from 'react-router-dom';

const PinModal = ({ isOpen, onClose, userId }) => {
  const [pin, setPin] = useState(new Array(6).fill(''));
  const [error, setError] = useState(null);
  const { verify2FA } = useContext(AuthContext); // Extract setUser and user from AuthContext
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (index, value) => {
    const sanitizedValue = value.replace(/[^0-9]/g, '');
    if (sanitizedValue.length > 1) return;

    const newPin = [...pin];
    newPin[index] = sanitizedValue;
    setPin(newPin);

    if (sanitizedValue && index < 5) {
      document.getElementById(`pin-${index + 1}`)?.focus();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fullPin = pin.join('');
    if (fullPin.length < 6) {
      setError('Please enter a complete 6-digit PIN.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/2fa/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, twoFactorCode: fullPin }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Verification failed. Please try again.');
      }

      if (data.success) {
        const { token } = data.data;
        // Update the global auth state with token and twoFactorEnabled flag
        verify2FA(token);
        navigate("/home");
        
      } else {
        throw new Error(data.error || 'Verification failed.');
      }
    } catch (error) {
      setError(error.message);
      addNotification({
        type: 'error',
        title: 'Error',
        message: error.message,
      });
    }
  };

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains(styles.modalOverlay)) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return isOpen ? (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <h2>Enter the PIN to confirm it&apos;s you.</h2>
        {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.pinForm}>
          <div className={styles.pinContainer}>
            {pin.map((digit, index) => (
              <input
                key={index}
                id={`pin-${index}`}
                type="tel"
                maxLength="1"
                className={styles.pinInput}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                autoFocus={index === 0}
              />
            ))}
          </div>
          <button type="submit" className={styles.button}>Submit</button>
        </form>
        <button className={styles.closeButton} onClick={onClose}>X</button>
      </div>
    </div>
  ) : null;
};

PinModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.string,
};

export default PinModal;
