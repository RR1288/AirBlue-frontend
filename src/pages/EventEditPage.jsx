import React from 'react';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faFilter, faCog } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const EventsEditPage = () => {
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
                    <h2 style={styles.eventTitle}>Events</h2>
                </div>

                {/* Filter Section */}
                <div style={styles.filterContainer}>
                    <input
                        type="text"
                        placeholder="Event title"
                        style={styles.filterInput}
                        value="IEEE Board Meeting 2024"
                    />
                    <input
                        type="text"
                        placeholder="Event type"
                        style={styles.filterInput}
                        value="Board Meeting"
                    />
                    <FontAwesomeIcon icon={faFilter} style={styles.icon} />
                    <button style={styles.clearButton}>CLEAR FILTERS</button>
                    <button style={styles.searchButton}>SEARCH</button>
                    <FontAwesomeIcon icon={faCog} style={styles.icon} />
                </div>

                {/* Section Title */}
                <h3 style={styles.month}>October</h3>
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
        marginTop: '-200px',
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
    filterContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '20px',
    },
    filterInput: {
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: 'white',
        color: 'black',
        flex: '1',
    },
    clearButton: {
        backgroundColor: '#fff',
        color: '#0B2853',
        border: '1px solid #0B2853',
        borderRadius: '5px',
        padding: '5px 10px',
        cursor: 'pointer',
    },
    searchButton: {
        backgroundColor: '#0A306E',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        padding: '5px 10px',
        cursor: 'pointer',
    },
    month: {
        color: '#0B2853',
        fontSize: '18px',
        fontWeight: 'bold',
        marginTop: '10px',
    },
};

export default EventsEditPage;
