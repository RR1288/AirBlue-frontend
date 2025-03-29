import React from 'react';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const EventDetailPage = () => {
    return (
        <div style={styles.page}>
            {/* Header Component */}
            <Header title="AirBlue System" />

            <div style={styles.mainContent}>
                {/* Back Button and Title */}
                <div style={styles.headerRow}>
                    <Link to="/my-events" style={styles.backButton}>
                        <FontAwesomeIcon icon={faArrowLeft} style={styles.icon} />
                    </Link>
                    <h1 style={styles.eventTitle}>IEEE Board Meeting 2024</h1>
                </div>

                {/* Event Details Section (Static Text) */}
                <div style={styles.detailsContainer}>
                    <p style={styles.detail}><strong>Date:</strong> October 31, 2024</p>
                    <p style={styles.detail}><strong>Event Type:</strong> Board Meeting</p>
                    <p style={styles.detail}><strong>Location:</strong> Rochester Conference Center</p>

                    {/* Budget Section (Read-Only) */}
                    <p style={styles.detail}><strong>Budget per Event:</strong> $5,000.00</p>
                    <p style={styles.detail}><strong>Budget per Attendee:</strong> $400.00</p>

                    {/* Notes Section (Read-Only) */}
                    <div style={styles.notesContainer}>
                        <strong>Notes:</strong>
                        <p style={styles.notes}>
                            Event Notes: The IEEE Board Meeting is scheduled for October 31, 2024 at the Rochester Conference Center. Awaiting RSVP's.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// **Styles**
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
        marginTop: '20px',
    },
    headerRow: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
    },
    backButton: {
        textDecoration: 'none',
        color: '#0B2853',
        marginRight: '20px',
    },
    icon: {
        fontSize: '20px',
    },
    eventTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#0B2853',
    },
    detailsContainer: {
        backgroundColor: '#F9F9F9',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    detail: {
        fontSize: '18px',
        color: '#333',
        marginBottom: '10px',
    },
    notesContainer: {
        marginTop: '20px',
        color: '#333',
    },
    notes: {
        fontSize: '16px',
        color: '#000000',
        backgroundColor: '#F9F9F9',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    link: {
        color: '#0B2853',
        textDecoration: 'underline',
        cursor: 'pointer',
    },
};

export default EventDetailPage;
