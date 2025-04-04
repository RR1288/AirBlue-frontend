import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

// FOR ATTENDEES REGISTERED EVENTS

const MyEventsPage = () => {
    const [selectedRole, setSelectedRole] = useState("");
    const [events, setEvents] = useState([]); // Stores attendee's registered events
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate();

    // Fetch Attendee's Registered Events (Backend Logic to be Implemented)
    useEffect(() => {
        setLoading(true);

        // TODO: Backend Devs - Implement API call to fetch attendee's registered events
        /*
        fetch('https://your-backend-api.com/api/my-events', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`, // If authentication is required
            },
        })
            .then(response => response.json())
            .then(data => {
                setEvents(data); // Ensure data matches expected event structure
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
                setLoading(false);
            });
        */

        // Mocked data for frontend testing (Remove once backend is integrated)
        setTimeout(() => {
            const mockEvents = [
                { id: 1, title: 'Tech Conference 2025', date: '2025-05-10', location: 'New York', description: 'Tech networking and keynotes.' },
                { id: 2, title: 'AI & ML Workshop', date: '2025-06-15', location: 'San Francisco', description: 'Deep dive into AI advancements.' },
                { id: 3, title: 'Startup Pitch Night', date: '2024-12-20', location: 'Chicago', description: 'Founders pitch to investors.' },
            ];
            setEvents(mockEvents);
            setLoading(false);
        }, 1000);
    }, []);

    // Separate upcoming and past events
    const today = new Date();
    const upcomingEvents = events.filter(event => new Date(event.date) >= today);
    const pastEvents = events.filter(event => new Date(event.date) < today);

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
                <h1 style={styles.h1}>My Events</h1>

                {loading ? (
                    <p style={styles.loading}>Loading your events...</p>
                ) : (
                    <>
                        {/* Upcoming Events Section */}
                        <section style={styles.section}>
                            <h2 style={styles.sectionTitle}>Upcoming Events</h2>
                            {upcomingEvents.length > 0 ? (
                                upcomingEvents.map(event => (
                                    <div key={event.id} style={styles.eventCard}>
                                        <h3 style={styles.eventTitle}>{event.title}</h3>
                                        <p style={styles.eventDetails}>{new Date(event.date).toLocaleDateString()} - {event.location}</p>
                                        <p style={styles.eventDescription}>{event.description}</p>
                                        <button onClick={() => navigate(`/event-details`)} style={styles.detailsButton}>View Details</button>
                                    </div>
                                ))
                            ) : (
                                <p style={styles.noEvents}>No upcoming events found.</p>
                            )}
                        </section>

                        {/* Past Events Section */}
                        <section style={styles.section}>
                            <h2 style={styles.sectionTitle}>Past Events</h2>
                            {pastEvents.length > 0 ? (
                                pastEvents.map(event => (
                                    <div key={event.id} style={styles.eventCard}>
                                        <h3 style={styles.eventTitle}>{event.title}</h3>
                                        <p style={styles.eventDetails}>{new Date(event.date).toLocaleDateString()} - {event.location}</p>
                                        <p style={styles.eventDescription}>{event.description}</p>
                                    </div>
                                ))
                            ) : (
                                <p style={styles.noEvents}>No past events found.</p>
                            )}
                        </section>
                    </>
                )}
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
        backgroundColor: '#f9f9f9',
        boxSizing: 'border-box',
    },
    mainContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
    },
    h1: {
        textAlign: 'center',
        color: '#0B2853',
        fontSize: '24px',
        fontWeight: '600',
        marginBottom: '20px',
    },
    section: {
        width: '100%',
        maxWidth: '800px',
        marginBottom: '30px',
    },
    sectionTitle: {
        fontSize: '20px',
        color: '#0B2853',
        borderBottom: '2px solid #0B2853',
        paddingBottom: '5px',
        marginBottom: '15px',
    },
    eventCard: {
        backgroundColor: '#fff',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '15px',
    },
    eventTitle: {
        fontSize: '18px',
        color: '#333',
        marginBottom: '5px',
    },
    eventDetails: {
        fontSize: '14px',
        color: '#555',
        marginBottom: '5px',
    },
    eventDescription: {
        fontSize: '16px',
        color: '#666',
    },
    detailsButton: {
        marginTop: '10px',
        padding: '8px 12px',
        backgroundColor: '#0B2853',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
    },
    noEvents: {
        fontSize: '16px',
        color: '#777',
        textAlign: 'center',
    },
    loading: {
        fontSize: '16px',
        color: '#0B2853',
        textAlign: 'center',
    },
};

export default MyEventsPage;
