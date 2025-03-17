import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const UserEventsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [events, setEvents] = useState([
        {
            id: 1,
            title: 'Community Clean-Up Day',
            date: '2025-04-22',
            location: 'Central Park',
            description: 'Join us for a day of community service to clean up our local park.',
        },
        {
            id: 2,
            title: 'Spring Art Festival',
            date: '2025-05-15',
            location: 'Downtown Art District',
            description: 'Experience local art, music, and food at the annual Spring Art Festival.',
        },
    ]);

    useEffect(() => {
        setFilteredEvents(
            events.filter((event) =>
                event.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, events]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div style={styles.container}>
            <Header title="Airblue System" />
            <main style={styles.main}>
                <section style={styles.searchSection}>
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        style={styles.searchInput}
                    />
                    <FontAwesomeIcon icon={faSearch} style={styles.searchIcon} />
                </section>
                <section style={styles.eventsSection}>
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                            <div key={event.id} style={styles.eventCard}>
                                <h3 style={styles.eventTitle}>{event.title}</h3>
                                <p style={styles.eventDate}>
                                    <FontAwesomeIcon icon={faCalendarAlt} /> {new Date(event.date).toLocaleDateString()}
                                </p>
                                <p style={styles.eventLocation}>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} /> {event.location}
                                </p>
                                <p style={styles.eventDescription}>{event.description}</p>
                                
                                {/* View Details Button */}
                                <Link to={`/event-details/${event.id}`} style={styles.detailsButton}>
                                    View Details
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p style={styles.noEventsMessage}>No events found.</p>
                    )}
                </section>
            </main>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#f9f9f9',
        boxSizing: 'border-box',
    },
    main: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
    },
    searchSection: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: '600px',
        marginBottom: '20px',
        position: 'relative',
    },
    searchInput: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #0B2853',
        borderRadius: '4px',
        backgroundColor: '#ffffff',
        color: '#000000',
    },
    searchIcon: {
        position: 'absolute',
        right: '10px',
        color: '#888',
    },
    eventsSection: {
        width: '100%',
        maxWidth: '800px',
    },
    eventCard: {
        backgroundColor: '#fff',
        padding: '20px',
        marginBottom: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    eventTitle: {
        fontSize: '20px',
        color: '#333',
        marginBottom: '10px',
    },
    eventDate: {
        fontSize: '14px',
        color: '#666',
        marginBottom: '5px',
    },
    eventLocation: {
        fontSize: '14px',
        color: '#666',
        marginBottom: '15px',
    },
    eventDescription: {
        fontSize: '16px',
        color: '#555',
    },
    detailsButton: {
        display: 'block',
        textAlign: 'center',
        backgroundColor: '#0B2853',
        color: 'white',
        textDecoration: 'none',
        padding: '10px',
        borderRadius: '5px',
        marginTop: '10px',
        fontSize: '16px',
        fontWeight: 'bold',
    },
    noEventsMessage: {
        fontSize: '16px',
        color: '#999',
        textAlign: 'center',
    },
};

export default UserEventsPage;
