// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCalendarAlt,
  faMapMarkerAlt,
  faEdit,
  faTimes,
  faUsers,
  // faPieChart,
} from "@fortawesome/free-solid-svg-icons";
//import ManageEventDetailsModal from "../components/ManageEventDetailsModal";
import styles from "./ManageEventsPage.module.css";
import getData from "../utils/getData";
import { useNotifications } from "../components/NotificationProvider";
import { formatDate } from "../utils/formatUtils";

const ManageEventsPage = () => {
  const userId = Number(localStorage.getItem("userId")) || null;
  const { addNotification } = useNotifications();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await getData("GET", "/events/getAllEventsFinanceView");
      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();

      // Sort events by start date (earliest first)
      const sortedEvents = data.data.sort(
        (a, b) => new Date(a.startDate) - new Date(b.startDate)
      );

      setEvents(sortedEvents);
    } catch (error) {
      addNotification({
        title: "Error",
        message: error.message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

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

  const openEventDetailsModal = (event) => {
    setSelectedEvent(event);
  };

  const closeEventDetailsModal = () => {
    setSelectedEvent(null);
  };

  const handleUpdateEvent = async (updatedEvent) => {
    // Replace with API call to update event details if needed.
    addNotification({
      title: "Success",
      message: "Event updated successfully!",
      type: "success",
    });
    fetchEvents();
  };

  const handleDeleteEvent = async (eventId) => {
    // Replace with API call to delete the event if needed.
    addNotification({
      title: "Success",
      message: "Event deleted successfully!",
      type: "success",
    });
    fetchEvents();
  };

  return (
    <div className={styles.container}>
      <Header title="Manage Events" />
      <main className={styles.main}>
        <section className={styles.searchSection}>
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
        </section>
        <section className={styles.eventsSection}>
          {loading ? (
            <p className={styles.loading}>Loading events...</p>
          ) : filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div key={event.id} className={styles.eventCard}>
                <h3 className={styles.eventTitle}>{event.title}</h3>
                <p className={styles.eventDate}>
                  <FontAwesomeIcon icon={faCalendarAlt} />{" "}
                  {formatDate(event.startDate)} - {formatDate(event.endDate)}
                </p>
                <p className={styles.eventLocation}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> {event.location}
                </p>
                <p className={styles.eventDescription}>{event.description}</p>
                <div className={styles.options}>
                  {/* Manage Attendees */}
                  <button
                    className={styles.optionButton}
                    onClick={() => openEventDetailsModal(event)}
                  >
                    <FontAwesomeIcon
                      icon={faUsers}
                      className={styles.optionIcon}
                    />{" "}
                    Manage Attendees
                  </button>
                  
                  {/* See Stats
                  <button
                    className={styles.optionButton}
                    // TODO: Change Modal to Open
                    onClick={() => openEventDetailsModal(event)}
                  >
                    <FontAwesomeIcon
                      icon={faPieChart}
                      className={styles.optionIcon}
                    />{" "}
                    See Stats
                  </button> */}

                  {/* Edit Event */}
                  <button
                    className={styles.optionButton}
                    onClick={() => handleUpdateEvent(event)}
                  >
                    <FontAwesomeIcon
                      icon={faEdit}
                      className={styles.optionIcon}
                    />{" "}
                    Edit Event
                  </button>
                  
                  {/* Delete Event */}
                  <button
                    className={styles.optionButton}
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={styles.optionIcon}
                    />{" "}
                    Delete Event
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noEventsMessage}>No events found.</p>
          )}
        </section>
      </main>
      {/* {selectedEvent && (
        <ManageEventDetailsModal
          event={selectedEvent}
          onClose={closeEventDetailsModal}
          onUpdateEvent={handleUpdateEvent}
        />
      )} */}
    </div>
  );
};

export default ManageEventsPage;
