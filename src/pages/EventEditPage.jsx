import React, { useState } from 'react';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';

const EventsEditPage = () => {
    const [eventDetails, setEventDetails] = useState({
        title: "IEEE Board Meeting 2024",
        eventType: "Board Meeting",
        date: "2025-10-15",
        location: "Rochester Conference Center",
        notes: "Annual strategic planning meeting for IEEE members.",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated Event Details:", eventDetails);
    };

    return (
        <div style={styles.page}>
            {/* Header Component */}
            <Header title="AirBlue System" />

            {/* Main Content */}
            <div style={styles.mainContent}>
                {/* Back Button and Title */}
                <div style={styles.headerRow}>
                    <Link to="/manage-events" style={styles.backButton}>
                        <FontAwesomeIcon icon={faArrowLeft} style={styles.icon} />
                    </Link>
                    <h2 style={styles.eventTitle}>Edit Event</h2>
                </div>

                {/* Event Edit Form */}
                <form onSubmit={handleSubmit} style={styles.form}>
                    {/* Event Title */}
                    <div style={styles.row}>
                        <label style={styles.label}>Event Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={eventDetails.title}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </div>

                    {/* Event Type */}
                    <div style={styles.row}>
                        <label style={styles.label}>Event Type:</label>
                        <select
                            name="eventType"
                            value={eventDetails.eventType}
                            onChange={handleChange}
                            style={styles.input}
                        >
                            <option value="Board Meeting">Board Meeting</option>
                            <option value="Conference">Conference</option>
                            <option value="Workshop">Workshop</option>
                            <option value="Seminar">Seminar</option>
                        </select>
                    </div>

                    {/* Event Date */}
                    <div style={styles.row}>
                        <label style={styles.label}>Event Date:</label>
                        <input
                            type="date"
                            name="date"
                            value={eventDetails.date}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </div>

                    {/* Location */}
                    <div style={styles.row}>
                        <label style={styles.label}>Location:</label>
                        <input
                            type="text"
                            name="location"
                            value={eventDetails.location}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </div>

                    {/* Notes */}
                    <div style={styles.row}>
                        <label style={styles.label}>Notes:</label>
                        <textarea
                            name="notes"
                            value={eventDetails.notes}
                            onChange={handleChange}
                            style={styles.textarea}
                        />
                    </div>

                    {/* Save Changes Button */}
                    <button type="submit" style={styles.saveButton}>
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

// Styles
const styles = {
    page: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#FFFFFF',
    },
    mainContent: {
        flex: 1,
        //display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '600px',
        margin: '10px auto',
        padding: '20px',
    },
    headerRow: {
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        width: '100%',
    },
    backButton: {
        textDecoration: 'none',
        color: '#0B2853',
        marginRight: '10px',
        fontSize: '16px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
    },
    icon: {
        fontSize: '16px',
        color: '#0B2853',
    },
    eventTitle: {
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#0B2853',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    row: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#0B2853',
    },
    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
        backgroundColor: '#FFFFFF',
        color: '#333',
    },
    textarea: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        minHeight: '100px',
        fontSize: '16px',
        backgroundColor: '#FFFFFF',
        color: '#333',
    },
    saveButton: {
        backgroundColor: '#0B2853',
        color: 'white',
        border: 'none',
        padding: '12px',
        borderRadius: '4px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        textAlign: 'center',
        width: '100%',
    },
};

export default EventsEditPage;
