import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const sanitizeData = (input) => {
    return input.replace(/<[^>]*>/g, '');
};

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [notification, setNotification] = useState('');
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle registration form submission
    const handleRegisterSubmit = (event) => {
        event.preventDefault();

        const sanitizedName = sanitizeData(formData.name);
        const sanitizedEmail = sanitizeData(formData.email);
        const sanitizedPassword = sanitizeData(formData.password);

         // email validation
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(formData.sanitizedEmail)) {
        setNotification("Please enter a valid email address.");
        return;
    }

        // password validation
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z@$!%*?&]{8,}$/;
        if (!passwordPattern.test(formData.sanitizedPassword)) {
        setNotification("Password must be at least 8 characters long, contain uppercase, and a special character.");
        return;
    }

        // Store user info locally (optional)
        localStorage.setItem('userInfo', JSON.stringify({ 
            name: formData.sanitizedName, 
            email: formData.sanitizedEmail 
        }));

        setNotification('Registration Successful! Redirecting...');
        
        // **IMMEDIATE REDIRECT** to SetUserInfoPage
        setTimeout(() => {
            navigate('/setuser-info');
        }, 500); 
    };

    return (
        <div style={styles.page}>
            <Header title="AirBlue System" hideSidebar={true}/>
            <div style={styles.mainContent}>
                <h1 style={styles.h1}>Register</h1>
                <div style={styles.formContainer}>
                    <form onSubmit={handleRegisterSubmit} style={styles.form}>
                        <div style={styles.formGroup}>
                            <label htmlFor="name" style={styles.label}>Name:</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
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
                            <small style={styles.passwordInfo}>
                                Password must be at least 8 characters long, include an uppercase letter, and a special character.
                            </small>
                        </div>
                        <button type="submit" style={styles.button}>Register</button>
                    </form>
                </div>
            </div>
            {notification && <div style={styles.notification}>{notification}</div>}
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
        margin: '10px 0',
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
        marginBottom: '15px',
    },
    label: {
        marginBottom: '8px',
        fontWeight: 'bold',
        color: '#0B2853',
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        color: '#000000',
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
        marginTop: '10px',
    },
    notification: {
        marginTop: '20px',
        textAlign: 'center',
        color: '#0B2853',
        fontWeight: 'bold',
    },
    passwordInfo: {
        display: 'block',
        marginTop: '5px',
        fontSize: '0.9em',
        color: '#555',
    },
};

export default RegisterPage;
