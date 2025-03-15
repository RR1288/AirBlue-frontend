import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { sendError } from '../utils/response';

const Notification = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 200);
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
                <h2>Enter the PIN from your email to confirm it's you.</h2>
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
                    <button type="submit" style={styles.button}>Submit</button>
                </form>
            </div>
        </div>
    ) : null;
};

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPinModal, setShowPinModal] = useState(false);
    const [notification, setNotification] = useState('');
    const navigate = useNavigate();

    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`https://airblue-backend-staging-eac124cc32ab.herokuapp.com/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data);
                const { token } = data.data;
                console.log('TOKEN: ', token);
                localStorage.setItem('token', token);
                setShowPinModal(true);
            } else {
                sendError(data.error || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handlePinSubmit = (pin) => {
        setNotification('Verification Successful! Redirecting to homepage...');
        setTimeout(() => {
            navigate('/home');
        }, 1000);
        setShowPinModal(false);
    };

    const handleCloseModal = () => {
        setShowPinModal(false);
    };

    return (
        <div style={styles.page}>
            <Header title="AirBlue System" />
            <div style={styles.mainContent}>
                <h1 style={styles.h1}>Login Page</h1>
                <div style={styles.loginContainer}>
                    <form onSubmit={handleLoginSubmit} style={styles.form}>
                        <div style={styles.formGroup}>
                            <label htmlFor="username" style={styles.label}>Username:</label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                        <button type="submit" style={styles.button}>Log In</button>
                    </form>

                    {/* Forgot Password Link */}
                    <div style={styles.forgotPasswordContainer}>
                        <Link to="/forgot-password" style={styles.forgotPasswordLink}>Forgot Password</Link>
                    </div>

                    <div style={styles.registerPrompt}>
                        Don't have an account? <Link to="/register" style={styles.registerLink}>Register</Link>
                    </div>

                    <button onClick={() => navigate('/attendee-register')} style={styles.registerButton}>
                        Register as Attendee
                    </button>
                </div>
            </div>
            <PinModal isOpen={showPinModal} onSubmit={handlePinSubmit} onClose={handleCloseModal} />
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
        margin: '20px 0',
    },
    mainContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        marginTop: '-450px',
    },
    loginContainer: {
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
    forgotPasswordContainer: {
        marginTop: '10px',
        textAlign: 'center',
    },
    forgotPasswordLink: {
        color: '#0B2853',
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: 'bold',
    },
    registerButton: {
        padding: '10px 20px',
        backgroundColor: '#28a745', // Green for "Register as Attendee"
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '18px',
        marginTop: '10px',
        display: 'block',
    },
    registerPrompt: {
        marginTop: '20px',
        textAlign: 'center',
        color: '#0B2853',
    },
    registerLink: {
        color: '#0B2853',
        textDecoration: 'none',
        fontWeight: 'bold',
        marginLeft: '5px',
    },
};

export default LoginPage;
