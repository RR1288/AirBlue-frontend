import React, { useState } from 'react';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const EventsEditPage = () => {
    const [selectedRole, setSelectedRole] = useState("");
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

    const handleRoleChange = (newRole) => {
        setSelectedRole(newRole);
    };

    return (
        <div style={styles.page}>
            <Header
                title="AirBlue System"
                userRole={selectedRole}
                onRoleChange={handleRoleChange}
            />
            <div style={styles.mainContent}>
                <div style={styles.headerRow}>
                    <Link to="/manage-events" style={styles.backButton}>
                        <FontAwesomeIcon icon={faArrowLeft} style={styles.icon} />
                    </Link>
                    <h2 style={styles.eventTitle}>Edit Event</h2>
                </div>
                <form onSubmit={handleSubmit} style={styles.form}>
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
                    <div style={styles.row}>
                        <label style={styles.label}>Notes:</label>
                        <textarea
                            name="notes"
                            value={eventDetails.notes}
                            onChange={handleChange}
                            style={styles.textarea}
                        />
                    </div>
                    <button type="submit" style={styles.saveButton}>
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = { /* your existing styles here */ };

export default EventsEditPage;
