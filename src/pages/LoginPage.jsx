import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { sendError } from '../utils/response';

// Login page shouldn't have a token check, but other pages should
// const headers = new Headers();
// headers.append('Authorization', `Bearer ${token}`);


const Notification = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 200);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div style={styles.notification}>{message}</div>
    );
};

const PinModal = ({ isOpen, onSubmit, onClose }) => {
    const [pin, setPin] = useState(new Array(6).fill(''));

    const handleChange = (index, value) => {
        const newPin = [...pin];
        newPin[index] = value.replace(/[^0-9]/g, '');
        setPin(newPin);
        if (value && index < 5) {
            document.getElementById(`pin-${index + 1}`).focus();
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        //call verify endpoint
        const response = await fetch('heroku/auth/2fa/verify', {
            method: "POST",
            headers: headers,
            body: JSON.stringify({pin})
        });
        //await fetch -> response
        //if response.ok -> data = await response.json()
        if(response.ok){
            const data = await response.json();
            //dataParsed = JSON.parse(data);

            console.log("TOKEN: ", token);
            console.log(data.message);
            console.log(data.data);
            if(data.sucess){

                alert("Verification Successful");
                const { token } = data.data;
                localStorage.setItem('token', token);

                if(localStorage.token){
                    headers = {'Authorization': localStorage.token}
                }
            }
            else{
                sendError(data.error || 'Verification failed. Please try again.');
                alert("Verification failed. Please try again")
            }
        } else {
                // Handle server errors
                sendError(data.error || 'Verification failed. Please try again.');
                alert("Verification failed. Please try again")
              }
        //check data.sucess, data.message, data.data (could be null)
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

    const handleLoginSubmit = async  (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`https://airblue-backend-staging-eac124cc32ab.herokuapp.com/auth/login`, {

                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            
            if (response.ok) {
                console.log(data);  
                    if(data.sucess){
                        //tell user credentials right
                        if(data.data.two_fa_required){
                            //show a modal
                            //user needs to enter password
                        }
                        if(data.data.token){
                            //save in localstore
                        }
                        else{
                            //display error message
                        }
                    }

                /*
                This is the structure of "data"
                    data = {
                        success: true,
                        message: message,
                        data: data,
                    }
                OR-----------------------------
                    data = {
                        success: false,
                        message: message,
                    }
                */
                
                // If data.success => go to home or open 2fa modal
                // Else => display error

                const { token } = data.data;
                console.log(data.message);
                
                console.log("TOKEN: ", token);
                localStorage.setItem('token', token);

                // if 2FA is required then open PIN modal you won't get a token
                // you'll get a message saying "2FA required"
                // Open the PIN modal and send a request here: https://airblue-backend-staging-eac124cc32ab.herokuapp.com/auth/2fa_verify
                // NOW, that will return a token

              } else {
                // Handle server errors
                sendError(data.error || 'Login failed. Please try again.');
              }
        } catch (error) {
            console.error(error);
            
        }

       setShowPinModal(true);
    };

    const handlePinSubmit = (pin) => {
        setNotification('Verification Successful! Redirecting to homepage...');
        setTimeout(() => {
            window.location.href = '/home';
        }, 1000);
        setShowPinModal(false);
    };
        
    const handleCloseModal = () => {
        setShowPinModal(false);
    };

    return (
        <div style={styles.page}>
            <Header title="AirBlue System" style={styles.header} />
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
    },
    welcomeText: {
        fontSize: '24px',
        color: '#0B2853',
        marginBottom: '40px',
        fontWeight: '600',
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
    color: '#000000' 
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#0B2853',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '18px',
        alignSelf: 'center', 
        margin: 'auto', 
        display: 'block'
    },        
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    pinContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '20px',
    },
    pinInput: {
        width: '40px',
        height: '40px',
        margin: '0 5px',
        fontSize: '16px',
        textAlign: 'center',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    notification: {
        position: 'fixed',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#0B2853',
        color: 'white',
        padding: '20px',
        borderRadius: '10px',
        zIndex: 1000,
    },
    
};

export default LoginPage;
