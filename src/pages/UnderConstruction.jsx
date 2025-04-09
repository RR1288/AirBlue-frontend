// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools } from '@fortawesome/free-solid-svg-icons';

// functional component to render "Under Construction" page
const UnderConstruction = () => {
    useEffect(() => {
        console.log("✅ UnderConstruction component is mounted");
    }, []);

    return (
        <div style={styles.page}>
            {/* render existing Header component at the top */}
            <Header title="AirBlue System" />

            {/* centered content */}
            <div style={styles.mainContent}>
                {/* welcome message */}
                <h2 style={styles.welcomeText}>Welcome back!</h2>

                {/* under construction card */}
                <div style={styles.card}>
                    {/* construction icon */}
                    <FontAwesomeIcon icon={faTools} style={styles.icon} />

                    {/* informative text */}
                    <p style={styles.cardTitle}>This page is under construction</p>
                </div>
            </div>
        </div>
    );
};

// Styles copied and adapted from HomePage
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
    },
    welcomeText: {
        fontSize: '24px',
        color: '#0B2853',
        marginBottom: '40px',
        fontWeight: '600',
    },
    card: {
        backgroundColor: '#0B2853',
        borderRadius: '8px',
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        maxWidth: '400px',
        width: '100%',
    },
    cardTitle: {
        color: '#FFFFFF',
        marginTop: '10px',
        fontSize: '18px',
        fontWeight: '500',
    },
    icon: {
        fontSize: '36px',
        color: 'white',
    },
};

export default UnderConstruction;
