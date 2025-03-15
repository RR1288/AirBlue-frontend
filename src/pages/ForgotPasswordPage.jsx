import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [pin, setPin] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1); // Step 1: Enter Email, Step 2: Enter PIN, Step 3: Reset Password
    const [notification, setNotification] = useState('');
    const navigate = useNavigate();

    // Step 1: Request PIN Code (Mocked)
    const handleRequestPin = (e) => {
        e.preventDefault();
        // TODO: Backend logic to send a reset PIN to the user's email
        setNotification('A reset PIN has been sent to your email.');
        setTimeout(() => setStep(2), 1000); // Move to next step
    };

    // Step 2: Verify PIN (Mocked)
    const handleVerifyPin = (e) => {
        e.preventDefault();
        // TODO: Verify PIN from backend (For now, any 4-digit PIN is accepted)
        if (pin.length === 4) {
            setNotification('PIN verified! Please enter a new password.');
            setTimeout(() => setStep(3), 1000); // Move to next step
        } else {
            setNotification('Invalid PIN. Please try again.');
        }
    };

    // Step 3: Reset Password (Mocked)
    const handleResetPassword = (e) => {
        e.preventDefault();
        
        // Check if passwords match
        if (newPassword !== confirmPassword) {
            setNotification('Passwords do not match. Please try again.');
            return;
        }

        // TODO: Backend logic to update password
        setNotification('Password successfully reset! Redirecting to login...');
        setTimeout(() => navigate('/login'), 1500); // Redirect after reset
    };

    return (
        <div style={styles.page}>
            <Header title="AirBlue System" hideSidebar={true}/>
            <div style={styles.mainContent}>
                <h1 style={styles.h1}>Forgot Password</h1>
                {notification && <div style={styles.notification}>{notification}</div>}

                {step === 1 && (
                    <form onSubmit={handleRequestPin} style={styles.form}>
                        <label htmlFor="email" style={styles.label}>Enter your email:</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            required
                        />
                        <button type="submit" style={styles.button}>Send Reset PIN</button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleVerifyPin} style={styles.form}>
                        <label htmlFor="pin" style={styles.label}>Enter the 4-digit PIN:</label>
                        <input
                            id="pin"
                            type="text"
                            maxLength="4"
                            value={pin}
                            onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))}
                            style={styles.input}
                            required
                        />
                        <button type="submit" style={styles.button}>Verify PIN</button>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleResetPassword} style={styles.form}>
                        <label htmlFor="newPassword" style={styles.label}>Enter your new password:</label>
                        <input
                            id="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            style={styles.input}
                            required
                        />

                        <label htmlFor="confirmPassword" style={styles.label}>Confirm new password:</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={styles.input}
                            required
                        />

                        <button type="submit" style={styles.button}>Reset Password</button>
                    </form>
                )}
            </div>
        </div>
    );
};

const styles = {
    page: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#ffffff',
        boxSizing: 'border-box',
    },
    mainContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
    },
    h1: {
        textAlign: 'center',
        color: '#0B2853',
        fontSize: '24px',
        fontWeight: '600',
        marginBottom: '20px',
    },
    notification: {
        textAlign: 'center',
        color: '#0B2853',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
    },
    label: {
        marginBottom: '10px',
        fontWeight: 'bold',
        color: '#0B2853',
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        color: '#000000', // Ensuring input text is clearly visible
        border: '1px solid #0B2853',
        borderRadius: '4px',
        backgroundColor: '#ffffff',
        marginBottom: '10px',
        outline: 'none', // Removes default blue outline
        caretColor: '#0B2853', // Cursor color
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#0B2853',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '18px',
    },
};

export default ForgotPasswordPage;
