import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './PinModal.module.css';

const PinModal = ({ isOpen, onSubmit, onClose }) => {
    const [pin, setPin] = useState(new Array(6).fill(''));
    const [error, setError] = useState(null);
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
                body: JSON.stringify({ pin: fullPin }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Verification failed. Please try again.');
            }

            if (data.success) {
                const { token } = data.data;
                localStorage.setItem('token', token);
                alert('Verification Successful');
                onSubmit(fullPin);
            } else {
                throw new Error(data.error || 'Verification failed.');
            }
        } catch (error) {
            setError(error.message);
            alert(error.message);
        }
    };

    // Close when clicking outside the modal
    const handleOverlayClick = (event) => {
        if (event.target.classList.contains(styles.modalOverlay)) {
            onClose();
        }
    };

    // Close when pressing "Escape"
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
                <h2>Enter the PIN from your email to confirm it&apos;s you.</h2>
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
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default PinModal;
