// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import {getData} from "../utils/getData";
import { useNotifications } from "../components/NotificationProvider";
import { useAuth } from '../context/AuthContext';
//import jwtDecode from 'jwt-decode';

// const Notification = ({ message, onClose }) => {
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             onClose();
//         }, 2000);
//         return () => clearTimeout(timer);
//     }, [onClose]);

//     return <div style={styles.notification}>{message}</div>;
// };

//sanitization
const sanitizeData = (input) => {
    return input.replace(/<[^>]*>/g, '');
};

const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
};

const isValidPassword = (password) => {
    // 8 chars, 1 upper, 1 lower, and special char
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
};

const RegisterOrgUserPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        city: '',
        state: '',
        password: '',
        confirmPassword: '',
        eventRole: false,
        financeRole: false,
        adminRole: false,
    });
    const { addNotification } = useNotifications();
    const navigate = useNavigate();
    const { token, username } = useAuth();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        // If the input type is checkbox, update the boolean value using 'checked'
        if (type === 'checkbox') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: checked, // set the boolean value to checked (true or false)
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value, // for other types (text, email, etc.), set the value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const sanitizedFirstName = sanitizeData(formData.firstName);
        const sanitizedLastName = sanitizeData(formData.lastName);
        const sanitizedEmail = sanitizeData(formData.email);
        const sanitizedCountry = sanitizeData(formData.country);
        const sanitizedCity = sanitizeData(formData.city);
        const sanitizedState = sanitizeData(formData.state);
        const sanitizedPassword = sanitizeData(formData.password);
        const sanitizedConfirmPassword = sanitizeData(formData.confirmPassword);

        //validations
        if (!sanitizedFirstName || !sanitizedLastName || !sanitizedEmail || !sanitizedCountry || !sanitizedCity || !sanitizedState || !sanitizedPassword || !sanitizedConfirmPassword) {
            addNotification({
                type: 'failure',
                title: 'All fields are required.'
            });
            return;
        }

        if (!isValidEmail(sanitizedEmail)) {
            addNotification({
                type: 'failure',
                title: 'Please enter a valid email address.'
            });
            return;
        }

        if (!isValidPassword(sanitizedPassword)) {
            addNotification({
                type: 'failure',
                title: 'Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, and a special character.'
            });
            return;
        }

        if (sanitizedPassword !== sanitizedConfirmPassword) {
            addNotification({
                type: 'failure',
                title: 'Passwords do not match.'
            });
            return;
        }
    
        let roleList = "";
        if(!formData.adminRole && !formData.eventRole && !formData.financeRole){
            addNotification({
                type: 'failure',
                title: 'Must select at least one permission group'
            });
        }
        if(formData.adminRole){
            roleList += "A";
        }
        if (formData.eventRole){
            roleList += "E";
        }
        if (formData.financeRole){
            roleList += "F";
        }
        console.log(roleList);

        //This is what the endpoint will accept
        const body = {
            fname: sanitizedFirstName,
            lname: sanitizedLastName,
            email: sanitizedEmail,
            country: sanitizedCountry,
            city: sanitizedCity,
            state: sanitizedState,
            password: sanitizedPassword,
            roles: roleList
        };

        try {
            const response = await getData("POST", "/users/create-organization-user", token, body);
        
            // Check if the response was successful
            if (response.ok) {
              const data = await response.json(); // Parse the JSON response
              console.log(data); // Log the successful response
        
              addNotification({
                type: 'success',
                title: 'Registration Successful! Redirecting to login page...',
                message: data.message, // Assume `message` is part of the response body
              });
              navigate("/admin"); // Redirect to admin page
            } else {
                addNotification({
                    type: 'error',
                    title: 'Registration Failed',
                    message: "Could not register, try again.",
                  });                  
            }
          } catch (error) {
            console.error(error); // Log the error
            addNotification({
                type: 'error',
                title: 'Registration Failed',
                message: "An error occurred. Please try again later.",
              }); 
          }
    };

    return (
        <div style={styles.page}>
            {/* Ensures Sidebar is hidden only when hideSidebar is explicitly passed */}
            <Header title="AirBlue System" hideSidebar={true} />
            <div style={styles.mainContent}>
                <h1 style={styles.h1}>Register as Attendee</h1>
                <div style={styles.formContainer}>
                    <p style={styles.requiredNote}>
                    Fields marked with <span style={{ color: 'red' }}>*</span> are required.
                    </p>
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div style={styles.formGroup}>
                        <label htmlFor="firstName" style={styles.label}>
                            First Name <span style={{ color: 'red' }}>*</span>
                        </label>                            
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
                        <label htmlFor="lastName" style={styles.label}>
                        Last Name: <span style={{ color: 'red' }}>*</span>
                        </label>                            
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
                        <label htmlFor="email" style={styles.label}>
                        Email:<span style={{ color: 'red' }}>*</span>
                        </label>                            
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
                        <label htmlFor="country" style={styles.label}>
                        Country:<span style={{ color: 'red' }}>*</span>
                        </label>                            
                            <input
                                id="country"
                                name="country"
                                type="country"
                                value={formData.country}
                                onChange={handleChange}
                                style={styles.input}
                                required
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label htmlFor="city" style={styles.label}>City:</label>
                            <input
                                id="city"
                                name="city"
                                type="city"
                                value={formData.city}
                                onChange={handleChange}
                                style={styles.input}
                                required
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label htmlFor="state" style={styles.label}>State:</label>
                            <input
                                id="state"
                                name="state"
                                type="state"
                                value={formData.state}
                                onChange={handleChange}
                                style={styles.input}
                                required
                            />
                        </div>
                        <div style={styles.formGroup}>
                        <label htmlFor="password" style={styles.label}>
                        Password:<span style={{ color: 'red' }}>*</span>
                        </label>                            
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
                                    Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, and a special character.
                                </small>
                        </div>
                        <div style={styles.formGroup}>
                        <label htmlFor="confirmPassword" style={styles.label}>
                        Confirm Password:<span style={{ color: 'red' }}>*</span>
                        </label>                            
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
                        <div>
                            <p>Permissions Groups:<span style={{ color: 'red' }}>*</span></p>
                            <label>Event Planner</label>
                            <input 
                                id="eventRole"
                                name="eventRole"
                                type="checkbox"
                                checked={formData.eventRole}
                                onChange={handleChange}
                            />
                            <label>Finance</label>
                            <input 
                                id="financeRole"
                                name="financeRole"
                                type="checkbox"
                                checked={formData.financeRole}
                                onChange={handleChange}
                            />
                            <label>Admin</label>
                            <input 
                                id="adminRol"
                                name="adminRole"
                                type="checkbox"
                                checked={formData.adminRole}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" style={styles.button}>Register</button>
                    </form>
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
    h1: {
        textAlign: 'center',
        color: '#0B2853',
        fontSize: '24px',
        fontWeight: '600',
        marginBottom: '20px',
    },
    mainContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
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
        marginTop: '10px',
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

export default RegisterOrgUserPage;
