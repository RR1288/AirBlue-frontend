import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendarAlt, faMapMarkerAlt, faDollarSign } from '@fortawesome/free-solid-svg-icons';

const FinanceEventsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [events, setEvents] = useState([
        {
            id: 1,
            title: 'Company Financial Review',
            date: '2025-04-22',
            location: 'Headquarters',
            description: 'Annual financial review for shareholders and stakeholders.',
        },
        {
            id: 2,
            title: 'Budget Allocation Meeting',
            date: '2025-05-15',
            location: 'Finance Boardroom',
            description: 'Meeting to discuss and allocate budgets for upcoming projects.',
        },
        // Add more placeholder events as needed
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
            <Header title="AirBlue System" />
            <main style={styles.main}>
                <section style={styles.searchSection}>
                    <input
                        type="text"
                        placeholder="Search finance events..."
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

                                {/* Finance Details Link */}
                                <Link to={`/finance-details`} style={styles.financeIcon}>
                                    <FontAwesomeIcon icon={faDollarSign} />
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p style={styles.noEventsMessage}>No finance events found.</p>
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
        position: 'relative',
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
    financeIcon: {
        position: 'absolute',
        top: '15px',
        right: '15px',
        color: '#0B2853',
        fontSize: '22px',
        cursor: 'pointer',
    },
    noEventsMessage: {
        fontSize: '16px',
        color: '#999',
        textAlign: 'center',
    },
};

export default FinanceEventsPage;
