import React, { useState } from 'react';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const EventDetailsPage = ({ event = {} /*, userRole */ }) => {
    // Commented out logic for finance users
    // const isFinance = userRole === 'finance';

    // Default values to avoid errors if event data is missing
    const [totalBudget, setTotalBudget] = useState(event.totalBudget || '');
    const [perAttendeeBudget, setPerAttendeeBudget] = useState(event.perAttendeeBudget || '');

    // Handle form submission (currently just logs values)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting budget:', { totalBudget, perAttendeeBudget });
    };

    // Ensure event data is present
    const eventName = event.name || 'Company Financial Review';
    const eventDate = event.date || '4/21/2025';
    const eventLocation = event.location || 'Headquarters';
    const eventStatus = event.status || 'Pending';

    return (
        <div style={styles.page}>
            {/* Header */}
            <Header title="AirBlue System" />

            <div style={styles.container}>
                {/* Back Button & Title */}
                <div style={styles.headerRow}>
                    <Link to="/home" style={styles.backButton}>
                        <FontAwesomeIcon icon={faArrowLeft} style={styles.icon} />
                    </Link>
                    <h1 style={styles.title}>Event Details</h1>
                </div>

                {/* Event Info */}
                <h2 style={styles.eventName}>{eventName}</h2>
                <p style={styles.eventDetail}><strong>Date:</strong> {eventDate}</p>
                <p style={styles.eventDetail}><strong>Location:</strong> {eventLocation}</p>

                {/* Budget Form (Accessible for all users) */}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <h3 style={styles.subTitle}>Budget Allocation</h3>

                    {/* Total Budget */}
                    <div style={styles.inputGroup}>
                        <label htmlFor="totalBudget" style={styles.label}>Total Event Budget</label>
                        <input
                            type="number"
                            id="totalBudget"
                            value={totalBudget}
                            onChange={(e) => setTotalBudget(e.target.value)}
                            required
                            min="0"
                            step="0.01"
                            style={styles.input}
                        />
                    </div>

                    {/* Per Attendee Budget */}
                    <div style={styles.inputGroup}>
                        <label htmlFor="perAttendeeBudget" style={styles.label}>Budget per Attendee</label>
                        <input
                            type="number"
                            id="perAttendeeBudget"
                            value={perAttendeeBudget}
                            onChange={(e) => setPerAttendeeBudget(e.target.value)}
                            required
                            min="0"
                            step="0.01"
                            style={styles.input}
                        />
                    </div>

                    {/* Submit Button (Visible for all users) */}
                    <button type="submit" style={styles.submitButton}>
                        Save Budget
                    </button>
                </form>
            </div>
        </div>
    );
};

/* Styles */
const styles = {
    page: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#F4F7FC',
        paddingBottom: '50px',
    },
    container: {
        flex: 1,
        width: '60%',
        margin: '40px auto',
        padding: '100px',
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        marginTop: '20px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    headerRow: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
    },
    backButton: {
        textDecoration: 'none',
        color: '#0B2853',
        marginRight: '15px',
    },
    icon: {
        fontSize: '20px',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginTop: '10px',
        color: '#0B2853',
    },
    eventName: {
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#0B2853',
        marginBottom: '10px',
    },
    eventDetail: {
        fontSize: '18px',
        color: '#333',
        marginBottom: '5px',
    },
    subTitle: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#0B2853',
        marginTop: '20px',
        marginBottom: '10px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        marginTop: '10px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        fontWeight: 'bold',
        color: '#0B2853',
        marginBottom: '5px',
    },
    input: {
        padding: '12px',
        border: '1px solid #0B2853',
        borderRadius: '5px',
        fontSize: '16px',
        backgroundColor: '#ffffff',
        color: '#333',
        width: '100%',
    },
    submitButton: {
        marginTop: '20px',
        padding: '12px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '18px',
        cursor: 'pointer',
        backgroundColor: '#0B2853',
        color: 'white',
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center',
    },
};

export default EventDetailsPage;
