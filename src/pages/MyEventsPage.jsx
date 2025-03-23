// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faInfoCircle, faCheck, faTimes, faPencil, faClock} from '@fortawesome/free-solid-svg-icons';
import styles from './MyEventsPage.module.css';
import getData from '../utils/getData';
import { useNotifications } from '../components/NotificationProvider';
import { formatDate } from '../utils/formatUtils';


const MyEventsPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const navigate = useNavigate();
    const { addNotification } = useNotifications();

    // Fetch events from API
    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
              const response = await getData('GET', '/attendees/view/getAllEventsAttendeeView');
              const data = await response.json();
              if (data.success) {
                setEvents(data.data);
                addNotification({
                  title: "Success",
                  message: "Events fetched successfully!",
                  type: "success",
                });
              } else {
                console.error('Failed to fetch events');
                addNotification({
                  title: "Error",
                  message: "Failed to fetch events",
                  type: "error",
                });
              }
            } catch (error) {
              console.error('Error fetching events:', error);
              addNotification({
                title: "Error",
                message: error.message,
                type: "error",
              });
            }
            setLoading(false);
          };

        fetchEvents();
    }, []);

    // Filter & sort events
    const getFilteredAndSortedData = () => {
        let filtered = events;

        // Filter by name or description
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(event =>
                event.name.toLowerCase().includes(query) || event.description.toLowerCase().includes(query)
            );
        }

        // Filter by status
        if (filterStatus) {
            filtered = filtered.filter(event => event.status === filterStatus);
        }

        return filtered;
    };

    const sortedFilteredEvents = getFilteredAndSortedData();
    const today = new Date();
    const upcomingEvents = sortedFilteredEvents.filter(event => new Date(event.startDate) >= today);

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

                {/* Search & Filters */}
                <div className={styles.filters}>
                    <input
                        type="text"
                        placeholder="Search by name or description..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className={styles.filterSelect}
                    >
                        <option value="">All Status</option>
                        <option value="select">Select Flight</option>
                        <option value="pending">Pending Approval</option>
                        <option value="approved">Approved</option>
                        <option value="denied">Denied</option>
                    </select>
                </div>

                {loading ? (
                    <p className={styles.loading}>Loading your events...</p>
                ) : (
                    <>
                        {/* Upcoming Events */}
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Upcoming Events</h2>
                            {upcomingEvents.length > 0 ? (
                                upcomingEvents.map(event => (
                                    <div key={event.id} className={styles.eventCard}>
                                        {renderStatusChip(event.status)}
                                        <h3 className={styles.eventTitle}>{event.name}</h3>
                                        <p className={styles.eventDetails}>
                                            {formatDate(event.startDate)} - {formatDate(event.endDate)}
                                        </p>
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
                                    </div>
                                ))
                            ) : (
                                <p className={styles.noEvents}>No upcoming events found.</p>
                            )}
                        </section>
                    </>
                )}
            </div>
        </div>
    );
};

export default MyEventsPage;
