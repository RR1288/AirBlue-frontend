import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { sendError } from '../utils/response';

const Notification = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return <div style={styles.notification}>{message}</div>;
};

const PinModal = ({ isOpen, onSubmit, onClose }) => {
    const [pin, setPin] = useState(new Array(4).fill(''));

    const handleChange = (index, value) => {
        const newPin = [...pin];
        newPin[index] = value.replace(/[^0-9]/g, '');
        setPin(newPin);
        if (value && index < 3) {
            document.getElementById(`pin-${index + 1}`).focus();
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(pin.join(''));
    };

    return isOpen ? (
        <div style={styles.modalOverlay}>
            <div style={styles.modal}>
                <h2>Enter the PIN sent to your email to verify your account.</h2>
                <form onSubmit={handleSubmit} style={styles.pinForm}>
                    <div style={styles.pinContainer}>
                        {pin.map((digit, index) => (
                            <input
                                key={index}
                                id={`pin-${index}`}
                                type="tel"
                                maxLength="1"
                                style={styles.pinInput}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                autoFocus={index === 0}
                            />
                        ))}
                    </div>
                    <button type="submit" style={styles.button}>Verify</button>
                </form>
            </div>
        </div>
    ) : null;
};

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPinModal, setShowPinModal] = useState(false);
    const [notification, setNotification] = useState('');
    const navigate = useNavigate();

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://airblue-backend-staging-eac124cc32ab.herokuapp.com/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                setShowPinModal(true);
            } else {
                sendError(data.error || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handlePinSubmit = (pin) => {
        setNotification('Registration Successful! Redirecting to login page...');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
        setShowPinModal(false);
    };

    return (
        <div style={styles.page}>
            <Header title="AirBlue System" style={styles.header} />
            <div style={styles.mainContent}>
                <h1 style={styles.h1}>Register</h1>
                <div style={styles.formContainer}>
                    <form onSubmit={handleRegisterSubmit} style={styles.form}>
                        <div style={styles.formGroup}>
                            <label htmlFor="name" style={styles.label}>Name:</label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label htmlFor="email" style={styles.label}>Email:</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label htmlFor="password" style={styles.label}>Password:</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <button type="submit" style={styles.button}>Register</button>
                    </form>
                </div>
            </div>
            <PinModal isOpen={showPinModal} onSubmit={handlePinSubmit} />
            {notification && <Notification message={notification} onClose={() => setNotification('')} />}
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
    header: {
        width: '100%',
        textAlign: 'center',
    },
    h1: {
        textAlign: 'center',
        color: '#0B2853',
        fontSize: '24px',
        fontWeight: '600',
        marginTop: '-60px',
        margin: '20px 0',
    },
    mainContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    formContainer: {
        width: '100%',
        maxWidth: '400px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
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

export default RegisterPage;
