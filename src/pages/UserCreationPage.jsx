import React from 'react';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const EventDetailPage = () => {
    return (
 <div style={styles.page}>
            {/* Header Component */}
            <Header title="AirBlue System" />

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            

            {/* Main Content */}
            <div style={styles.mainContent}>
                {/* Back Button and Title */}
                <div style={styles.headerRow}>
                    <Link to="/home" style={styles.backButton}>
                        <FontAwesomeIcon icon={faArrowLeft} style={styles.icon} />
                    </Link>
                    <h1 style={styles.eventTitle}>Create Users</h1>
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
        backgroundColor: '#FFFFFF',
    },
    mainContent: {
        flex: 1,
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
    },
    headerRow: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        marginTop: '200px',
    },
    backButton: {
        textDecoration: 'none',
        color: '#0B2853',
        fontSize: '16px',
        fontWeight: '600',
        marginRight: '20px',
    },
    icon: {
        fontSize: '16px',
        color: '#0B2853',
        cursor: 'pointer',
    },
    eventTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#0B2853',
    },

};