import React, { useState } from 'react';
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

const RegisterAttendeePage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [notification, setNotification] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            sendError('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch(`https://airblue-backend-staging-eac124cc32ab.herokuapp.com/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setNotification('Registration Successful! Redirecting to login page...');
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                sendError(data.error || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={styles.page}>
            <Header title="AirBlue System" style={styles.header} />
            <div style={styles.mainContent}>
                <h1 style={styles.h1}>Register as Attendee</h1>
                <div style={styles.formContainer}>
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div style={styles.formGroup}>
                            <label htmlFor="firstName" style={styles.label}>First Name:</label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                value={formData.firstName}
                                onChange={handleChange}
                                style={styles.input}
                                required
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label htmlFor="lastName" style={styles.label}>Last Name:</label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                value={formData.lastName}
                                onChange={handleChange}
                                style={styles.input}
                                required
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label htmlFor="email" style={styles.label}>Email:</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                style={styles.input}
                                required
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label htmlFor="password" style={styles.label}>Password:</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                style={styles.input}
                                required
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label htmlFor="confirmPassword" style={styles.label}>Confirm Password:</label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                style={styles.input}
                                required
                            />
                        </div>
                        <button type="submit" style={styles.button}>Register</button>
                    </form>
                </div>
            </div>
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
    formContainer: {
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
    notification: {
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#28a745',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '4px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
};

export default RegisterAttendeePage;
