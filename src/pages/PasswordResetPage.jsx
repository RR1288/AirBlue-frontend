import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const PasswordResetPage = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handlePasswordReset = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch(`https://airblue-backend-staging-eac124cc32ab.herokuapp.com/auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Password has been updated successfully!");
                setTimeout(() => {
                    navigate('/user-info');
                }, 2000);
            } else {
                setMessage(data.error || "Failed to reset password. Try again.");
            }
        } catch (error) {
            console.error(error);
            setMessage("An error occurred. Please try again later.");
        }
    };

    return (
        <div style={styles.page}>
            <Header title="AirBlue System" />
            <div style={styles.mainContent}>
                <h1 style={styles.h1}>Reset Your Password</h1>
                <div style={styles.container}>
                    <form onSubmit={handlePasswordReset} style={styles.form}>
                        <div style={styles.formGroup}>
                            <label htmlFor="currentPassword" style={styles.label}>Current Password:</label>
                            <input
                                id="currentPassword"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                style={styles.input}
                                required
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label htmlFor="newPassword" style={styles.label}>New Password:</label>
                            <input
                                id="newPassword"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                style={styles.input}
                                required
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label htmlFor="confirmPassword" style={styles.label}>Confirm New Password:</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                style={styles.input}
                                required
                            />
                        </div>
                        <button type="submit" style={styles.button}>Update Password</button>
                    </form>
                    {message && <p style={styles.message}>{message}</p>}
                </div>
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
        justifyContent: 'center',
        padding: '20px',
        marginTop: '-390px',
    },
    h1: {
        textAlign: 'center',
        color: '#0B2853',
        fontSize: '24px',
        fontWeight: '600',
        margin: '20px 0',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '400px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    formGroup: {
        marginBottom: '20px',
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
        border: '1px solid #0B2853',
        borderRadius: '4px',
        backgroundColor: '#ffffff',
        color: '#000000',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#0B2853',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '18px',
        margin: '10px 0',
        display: 'block',
    },
    message: {
        marginTop: '20px',
        textAlign: 'center',
        color: '#0B2853',
    },
};

export default PasswordResetPage;
