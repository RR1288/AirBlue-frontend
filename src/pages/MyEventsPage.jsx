// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faInfoCircle, faCheck, faTimes, faPencil, faClock } from '@fortawesome/free-solid-svg-icons';
import styles from './MyEventsPage.module.css';

const MyEventsPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            const mockEvents = [
                { id: 1, name: 'Tech Conference 2025', startDate: '2025-05-10', endDate: '2025-05-11', location: 'New York', description: 'Tech networking and keynotes.', status: 'pending' },
                { id: 2, name: 'AI & ML Workshop', startDate: '2025-06-15', endDate: '2025-06-17',location: 'San Francisco', description: 'Deep dive into AI advancements.', status: 'select' },
                { id: 3, name: 'Startup Pitch Night', startDate: '2025-07-20', endDate: '2025-07-25',location: 'Chicago', description: 'Founders pitch to investors.', status: 'approved' },
                { id: 4, name: 'Startup Pitch Night', startDate: '2025-04-20', endDate: '2025-04-27',location: 'Rochester', description: 'Founders pitch to investors.', status: 'denied' },
                { id: 5, name: 'Project Presentation', startDate: '2024-12-20', endDate: '2024-12-31',location: 'Chicago', description: 'Founders pitch to investors.', status: 'past' },
            ];
            setEvents(mockEvents);
            setLoading(false);
        }, 1000);
    }, []);

    const today = new Date();
    const upcomingEvents = events.filter(event => new Date(event.startDate) >= today);
    const pastEvents = events.filter(event => new Date(event.startDate) < today);

    const renderStatusChip = (status) => {
        const statusIcons = {
            select: faPlane,
            pending: faClock,
            approved: faCheck,
            denied: faTimes,
            past: faClock
        };
        const statusLabels = {
            select: 'Select Flight',
            pending: 'Pending Approval',
            approved: 'Approved',
            denied: 'Denied',
            past: 'Past'
        };
        return (
            <div className={`${styles.statusChip} ${styles[status]}`}>
                <FontAwesomeIcon icon={statusIcons[status]} /> {statusLabels[status]}
            </div>
        );
    };

    return (
        <div className={styles.page}>
            <Header title="AirBlue System" />
            <div className={styles.mainContent}>
                <h1 className={styles.h1}>My Events</h1>

                {loading ? (
                    <p className={styles.loading}>Loading your events...</p>
                ) : (
                    <>
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Upcoming Events</h2>
                            {upcomingEvents.length > 0 ? (
                                upcomingEvents.map(event => (
                                    <div key={event.id} className={styles.eventCard}>
                                        {renderStatusChip(event.status)}
                                        <h3 className={styles.eventTitle}>{event.name}</h3>
                                        <p className={styles.eventDetails}>{new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</p>
                                        <p className={styles.eventDetails}>{event.location}</p>
                                        <p className={styles.eventDescription}>{event.description}</p>

                                        {event.status === 'select' && (
                                            <button className={styles.detailsButton} onClick={() => navigate(`/flight-search/${event.id}`)}>
                                                <FontAwesomeIcon icon={faPlane} /> Book Flight
                                            </button>
                                        )}
                                        {event.status === 'pending' && (
                                            <>
                                                <button className={styles.detailsButton} onClick={() => navigate(`/flight-details/${event.id}`)}>
                                                    <FontAwesomeIcon icon={faInfoCircle} /> Flight Details
                                                </button>
                                                <button className={styles.detailsButton} onClick={() => navigate(`/edit-flight/${event.id}`)}>
                                                    <FontAwesomeIcon icon={faPencil} /> Change Flight
                                                </button>
                                            </>
                                        )}
                                        {event.status === 'approved' && (
                                            <button className={styles.detailsButton}>
                                                <FontAwesomeIcon icon={faInfoCircle} /> Flight Details
                                            </button>
                                        )}
                                        {event.status === 'denied' && (
                                            <button className={styles.detailsButton} onClick={() => navigate(`/flight-search/${event.id}`)}>
                                                <FontAwesomeIcon icon={faPlane} /> Request Flight
                                            </button>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className={styles.noEvents}>No upcoming events found.</p>
                            )}
                        </section>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Past Events</h2>
                            {pastEvents.length > 0 ? (
                                pastEvents.map(event => (
                                    <div key={event.id} className={styles.eventCard}>
                                        {renderStatusChip('past')}
                                        <h3 className={styles.eventTitle}>{event.name}</h3>
                                        <p className={styles.eventDetails}>{new Date(event.startDate).toLocaleDateString()} - {event.location}</p>
                                        <p className={styles.eventDescription}>{event.description}</p>
                                    </div>
                                ))
                            ) : (
                                <p className={styles.noEvents}>No past events found.</p>
                            )}
                        </section>
                    </>
                )}
            </div>
        </div>
    );
};

export default MyEventsPage;
