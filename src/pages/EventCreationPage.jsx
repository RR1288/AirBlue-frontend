import React from 'react';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const EventCreationPage = () => {
    return (
        <div style={styles.page}>
            {/* _Header_Component_ */}
            <Header title="AirBlue System" />

            <div style={styles.mainContent}>
                {/* _Back_Button_and_Title_ */}
                <div style={styles.headerRow}>
                    <Link to="/manage-events" style={styles.backButton}>
                        <FontAwesomeIcon icon={faArrowLeft} style={styles.icon} />
                    </Link  >
                    <h1 style={styles.eventTitle}>Create New Event</h1>
                </div>

                {/* _Event_Creation_Form_ */}
                <form style={styles.form}>
                    <div style={styles.row}>
                        <label style={styles.label}>Event Title:</label>
                        <input type="text" placeholder="Enter event title" style={styles.input} />
                    </div>

                    <div style={styles.row}>
                        <label style={styles.label}>Date:</label>
                        <input type="date" style={styles.input} />
                    </div>

                    <div style={styles.row}>
                        <label style={styles.label}>Event Type:</label>
                        <select style={styles.input}>
                            <option>Select Event Type</option>
                            <option>Board Meeting</option>
                            <option>Conference</option>
                            <option>Workshop</option>
                        </select>
                    </div>

                    <div style={styles.row}>
                        <label style={styles.label}>Location:</label>
                        <input type="text" placeholder="Enter location" style={styles.input} />
                    </div>

                    <div style={styles.budgetRow}>
                        <div style={styles.row}>
                            <label style={styles.label}>Budget per Event:</label>
                            <input type="text" placeholder="$0.00" style={styles.input} />
                        </div>
                        <div style={styles.row}>
                            <label style={styles.label}>Budget per Attendee:</label>
                            <input type="text" placeholder="$0.00" style={styles.input} />
                        </div>
                    </div>

                    <div style={styles.row}>
                        <label style={styles.label}>Notes:</label>
                        <textarea placeholder="Enter additional notes" style={styles.textarea}></textarea>
                    </div>

                    <div style={styles.buttonRow}>
                        <button type="button" style={styles.createButton}>Create Event</button>
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
        maxWidth: '800px', 
        margin: '0 auto', 
        marginTop: '180px',
        padding: '20px' 
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
        gap: '20px' 
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
        backgroundColor: '#F9F9F9' 
    },
    textarea: { 
        padding: '10px', 
        minHeight: '100px', 
        borderRadius: '4px', 
        border: '1px solid #ccc', 
        backgroundColor: '#F9F9F9' 
    },
    budgetRow: { 
        display: 'flex', 
        gap: '20px' 
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
        cursor: 'pointer' 
    },
};

export default EventCreationPage;