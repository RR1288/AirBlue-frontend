// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../components/NotificationProvider';
import PinModal from '../components/PinModal';
import styles from './Enable2FAPage.module.css';

const Enable2FAPage = () => {
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [showPinModal, setShowPinModal] = useState(false);
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  }

  // Handle 2FA Setup: fetch the QR code from the server.
  const handleEnable2FA = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/2fa/setup`, {
        method: 'POST',
        headers: headers,
      });

      if (!response.ok) {
        throw new Error('Failed to get QR code for 2FA setup.');
      }

      const data = await response.json();
      // Assuming the response returns the base64 QR code in data.qrCode
      setQrCodeUrl(data.data.qrCode);

      addNotification({
        type: 'success',
        title: '2FA Setup Success',
        message: '2FA setup successful. Please scan the QR code with your authenticator app.',
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: error.message,
      });
    }
  };

  const handleVerificationSuccess = () => {
    // Redirect to home after successful verification.
    navigate('/home');
  };

  // Handle page close or modal close: disable 2FA if not verified.
  const handlePageClose = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/auth/2fa/disable`, {
        method: 'POST',
        headers: headers,
      });

      addNotification({
        type: 'info',
        title: '2FA Setup Cancelled',
        message: 'The 2FA setup has been cancelled.',
      });

      navigate('/');
    } catch (error) {
      console.error('Error disabling 2FA:', error);
    }
  };

  // Set up a timeout to disable 2FA if the user doesn't complete verification within 5 minutes.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handlePageClose();
    }, 5 * 60 * 1000); // 5 minutes timeout

    return () => clearTimeout(timeoutId);
  }, []);

  // When the PinModal is closed without verification, call handlePageClose.
  const handleModalClose = () => {
    setShowPinModal(false);
    handlePageClose();
  };

  return (
    <div className={styles.page}>
      <h1>Enable Two-Factor Authentication</h1>

      {/* If the QR code is available, show it along with a button to verify.
          Otherwise, show the "Enable 2FA" button */}
      {qrCodeUrl ? (
        <div>
          <h2>Scan the QR code with your authenticator app</h2>
          <div>
            <img src={qrCodeUrl} alt="QR Code for 2FA" className={styles.qrCode} />
          </div>
            <button onClick={() => setShowPinModal(true)} className={styles.button}>
              Verify 2FA Setup
            </button>
        </div>
      ) : (
        <button onClick={handleEnable2FA} className={styles.button}>
          Enable 2FA
        </button>
      )}

      {/* PinModal for entering the verification code */}
      <PinModal
        isOpen={showPinModal}
        onSubmit={handleVerificationSuccess}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default Enable2FAPage;
