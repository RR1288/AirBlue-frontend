import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const EventCreationPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        eventType: '',
        location: '',
        attendeeLimit: '',
        description: '',
        notes: ''
    });

    const navigate = useNavigate();

    // Handles form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // TODO: Implement backend logic for event creation
        try {
            const response = await fetch('https://airblue-backend-staging-eac124cc32ab.herokuapp.com/events/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Event successfully created!');
                navigate('/manage-events'); // Redirect to manage events page
            } else {
                alert('Event creation failed. Please try again.');
            }
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    return (
        <div style={styles.page}>
            <Header title="AirBlue System" />

            <div style={styles.mainContent}>
                <div style={styles.headerRow}>
                    <Link to="/manage-events" style={styles.backButton}>
                        <FontAwesomeIcon icon={faArrowLeft} style={styles.icon} />
                    </Link>
                    <h1 style={styles.eventTitle}>Create New Event</h1>
                </div>

                <form style={styles.form} onSubmit={handleSubmit}>
                    <div style={styles.row}>
                        <label style={styles.label}>Event Title:</label>
                        <input 
                            type="text" 
                            name="title"
                            placeholder="Enter event title" 
                            style={styles.input}
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={styles.row}>
                        <label style={styles.label}>Date:</label>
                        <input 
                            type="date" 
                            name="date"
                            style={styles.input}
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={styles.row}>
                        <label style={styles.label}>Event Type:</label>
                        <select 
                            name="eventType"
                            style={styles.input}
                            value={formData.eventType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Event Type</option>
                            <option value="Board Meeting">Board Meeting</option>
                            <option value="Conference">Conference</option>
                            <option value="Workshop">Workshop</option>
                        </select>
                    </div>

                    <div style={styles.row}>
                        <label style={styles.label}>Location:</label>
                        <input 
                            type="text" 
                            name="location"
                            placeholder="Enter location" 
                            style={styles.input}
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={styles.row}>
                        <label style={styles.label}>Max Attendees:</label>
                        <input 
                            type="number" 
                            name="attendeeLimit"
                            placeholder="Enter attendee limit" 
                            style={styles.input}
                            value={formData.attendeeLimit}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={styles.row}>
                        <label style={styles.label}>Event Description:</label>
                        <textarea 
                            name="description"
                            placeholder="Provide a brief description" 
                            style={styles.textarea}
                            value={formData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <div style={styles.row}>
                        <label style={styles.label}>Additional Notes:</label>
                        <textarea 
                            name="notes"
                            placeholder="Enter any additional notes" 
                            style={styles.textarea}
                            value={formData.notes}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div style={styles.buttonRow}>
                        <button type="submit" style={styles.createButton}>Create Event</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// _STYLES_OBJECT_
const styles = {
    page: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#FFFFFF'
    },
    mainContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
    },
    headerRow: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px'
    },
    backButton: {
        textDecoration: 'none',
        color: '#0B2853',
        marginRight: '20px'
    },
    icon: {
        fontSize: '20px'
    },
    eventTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#0B2853'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        maxWidth: '500px'
    },
    row: {
        display: 'flex',
        flexDirection: 'column'
    },
    label: {
        marginBottom: '5px',
        color: '#0B2853',
        fontWeight: 'bold'
    },
    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        backgroundColor: '#F9F9F9',
        fontSize: '16px'
    },
    textarea: {
        padding: '10px',
        minHeight: '100px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        backgroundColor: '#F9F9F9',
        fontSize: '16px'
    },
    buttonRow: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px'
    },
    createButton: {
        backgroundColor: '#0B2853',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '4px',
        padding: '10px 20px',
        cursor: 'pointer',
        fontSize: '16px'
    },
};

export default EventCreationPage;
