// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlane,
  faInfoCircle,
  faCheck,
  faTimes,
  faPencil,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./MyEventsPage.module.css";
import getData from "../utils/getData";
import { useNotifications } from "../components/NotificationProvider";
import { formatDate } from "../utils/formatUtils";

const MyEventsPage = () => {
  const [upcomingEventsList, setUpcomingEventsList] = useState([]);
  const [pastEventsList, setPastEventsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedTab, setSelectedTab] = useState("upcoming"); // "upcoming" or "past"
  const navigate = useNavigate();
  const { addNotification } = useNotifications();

  // Fetch upcoming events from API
  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      setLoading(true);
      try {
        const response = await getData('GET', '/attendees/view/getAllEventsAttendeeView');
        const data = await response.json();
        if (data.success) {
          setUpcomingEventsList(data.data);
          addNotification({
            title: "Success",
            message: "Events fetched successfully!",
            type: "success",
          });
        } else {
          addNotification({
            title: "Error",
            message: "Failed to fetch events",
            type: "error",
          });
        }
      } catch (error) {
        addNotification({
          title: "Error",
          message: error.message,
          type: "error",
        });
      }
      setLoading(false);
    };

    fetchUpcomingEvents();
  }, [addNotification]);

  // Fetch past events (currently mocked; replace with API call if available)
  useEffect(() => {
    const fetchPastEvents = async () => {
      setLoading(true);
      // Example mock for past events
      setPastEventsList([
        {
          id: "1",
          name: "Past Event Sample 2025",
          startDate: "2024-04-15T09:00:00.000Z",
          endDate: "2024-04-17T17:00:00.000Z",
          location: "Ithaca NY",
          description: "A past event to mock past data.",
          status: "past",
          cost: 500,
          groupName: "VIP Group",
          flightBudget: "5000.00",
        },
      ]);
      setLoading(false);
    };

    fetchPastEvents();
  }, [addNotification]);

  // Function to filter events based on search query and status
  const getFilteredData = (list) => {
    let filtered = list;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.name.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query)
      );
    }
    if (filterStatus) {
      filtered = filtered.filter((event) => event.status === filterStatus);
    }
    return filtered;
  };

  // Depending on the selected tab, use the corresponding list
  const displayedEvents =
    selectedTab === "upcoming"
      ? getFilteredData(upcomingEventsList)
      : getFilteredData(pastEventsList);

  // Render a chip for flight status
  const renderStatusChip = (status) => {
    const statusIcons = {
      select: faPlane,
      pending: faClock,
      approved: faCheck,
      denied: faTimes,
      past: faTimes,
    };
    const statusLabels = {
      select: "Select Flight",
      pending: "Pending Approval",
      approved: "Approved",
      denied: "Denied",
      past: "Past",
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

        {/* Search & Filter Controls */}
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

        {/* Tabs for Upcoming and Past Events */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tabButton} ${
              selectedTab === "upcoming" ? styles.activeTab : ""
            }`}
            onClick={() => setSelectedTab("upcoming")}
          >
            Upcoming Events
          </button>
          <button
            className={`${styles.tabButton} ${
              selectedTab === "past" ? styles.activeTab : ""
            }`}
            onClick={() => setSelectedTab("past")}
          >
            Past Events
          </button>
        </div>

        {loading ? (
          <p className={styles.loading}>Loading your events...</p>
        ) : (
          <>
            {selectedTab === "upcoming" && displayedEvents.length > 0 && (
              <section className={styles.section}>
                {displayedEvents.map((event) => (
                  <div key={event.id} className={styles.eventCard}>
                    {renderStatusChip(event.status)}
                    <h3 className={styles.eventTitle}>{event.name}</h3>
                    <p className={styles.eventDetails}>
                      {formatDate(event.startDate)} - {formatDate(event.endDate)}
                    </p>
                    <p className={styles.eventDetails}>{event.location}</p>
                    <p className={styles.eventDescription}>{event.description}</p>
                    {event.status === "select" && (
                      <button
                        className={styles.detailsButton}
                        onClick={() =>
                          navigate(`/flight-search/${event.id}`, { state: { event } })
                        }
                      >
                        <FontAwesomeIcon icon={faPlane} /> Book Flight
                      </button>
                    )}
                    {event.status === "pending" && (
                      <>
                        <button
                          className={styles.detailsButton}
                          onClick={() => navigate(`/flight-details/${event.id}`)}
                        >
                          <FontAwesomeIcon icon={faInfoCircle} /> Flight Details
                        </button>
                        <button
                          className={styles.detailsButton}
                          onClick={() => navigate(`/edit-flight/${event.id}`)}
                        >
                          <FontAwesomeIcon icon={faPencil} /> Change Flight
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </section>
            )}
            {selectedTab === "upcoming" && displayedEvents.length === 0 && (
              <p className={styles.noEvents}>No upcoming events found.</p>
            )}
            {selectedTab === "past" && displayedEvents.length > 0 && (
              <section className={styles.section}>
                {displayedEvents.map((event) => (
                  <div key={event.id} className={styles.eventCard}>
                    {renderStatusChip("past")}
                    <h3 className={styles.eventTitle}>{event.name}</h3>
                    <p className={styles.eventDetails}>
                      {formatDate(event.startDate)} - {formatDate(event.endDate)}
                    </p>
                    <p className={styles.eventDetails}>{event.location}</p>
                    <p className={styles.eventDescription}>{event.description}</p>
                  </div>
                ))}
              </section>
            )}
            {selectedTab === "past" && displayedEvents.length === 0 && (
              <p className={styles.noEvents}>No past events found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyEventsPage;
