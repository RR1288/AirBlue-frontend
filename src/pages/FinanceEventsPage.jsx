// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faCalendarAlt,
    faMapMarkerAlt,
    faDollarSign,
    faChartPie,
} from "@fortawesome/free-solid-svg-icons";
import FinanceEventDetailsModal from "../components/FinanceEventDetailsModal";
import FinanceEventStatsModal from "../components/FinanceEventStatsModal";
import styles from "./FinanceEventsPage.module.css";

import getData from "../utils/getData";
import {useNotifications} from "../components/NotificationProvider";

const FinanceEventsPage = () => {
    const userId = parseInt(localStorage.getItem("userId"));
    const {addNotification} = useNotifications();

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedStatsEvent, setSelectedStatsEvent] = useState(null);
    const [events, setEvents] = useState([]);
    const [loadingAssign, setLoadingAssign] = useState(false);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await getData("GET", `/events/getAllEventsFinanceView`);
            if (!res.ok) throw new Error("Failed to fetch events");
            const data = await res.json();
            setEvents(data.data);
        } catch (error) {
            addNotification({
                title: "Error",
                message: error.message,
                type: "error",
            });
        }
    };

    const updateBudget = async (eventId, totalBudget, flightBudget) => {
        try {
            const res = await getData("POST", "/events/set-budget", {
                userId,
                eventID: eventId,
                totalBudget,
                flightBudget,
            });
            if (!res.ok) throw new Error("Failed to update budget");
            addNotification({
                title: "Success",
                message: "Budget updated successfully!",
                type: "success",
            });
            fetchEvents();
        } catch (error) {
            addNotification({
                title: "Error",
                message: error.message,
                type: "error",
            });
        }
    };

    const assignEventToMe = async (eventId) => {
        setLoadingAssign(true);
        try {
            const res = await getData("POST", "/events/join-eventstaff-finance", {
                userID: userId,
                eventID: eventId,
            });
            if (!res.ok) throw new Error("Failed to assign event");

            addNotification({
                title: "Success",
                message: "Event assigned successfully!",
                type: "success",
            });
        } catch (error) {
            addNotification({
                title: "Error",
                message: error.message,
                type: "error",
            });
        } finally {
            setLoadingAssign(false);
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

    const openBudgetModal = async (event) => {
        if (event.EventStaffs.financeUser === null) {
            // Assign orphan event before opening budget modal
            await assignEventToMe(
                event.id,
                event.eventBudget || 0,
                event.flightBudget || 0
            );
        } 
        setSelectedEvent(event);
    };

    const closeBudgetModal = () => {
        setSelectedEvent(null);
    };

    const openStatsModal = (event, e) => {
        // Prevent the card click event from triggering the budget modal.
        e.stopPropagation();
        setSelectedStatsEvent(event);
    };

    const closeStatsModal = () => {
        setSelectedStatsEvent(null);
    };

    const handleUpdateBudget = async (updatedEvent) => {
        // Update Budget handles its own notifications
        await updateBudget(
            updatedEvent.id,
            updatedEvent.eventBudget,
            updatedEvent.flightBudget
        );
    };

    return (
        <div className={styles.container}>
            <Header title="AirBlue System" />
            <main className={styles.main}>
                <section className={styles.searchSection}>
                    <input
                        type="text"
                        placeholder="Search finance events..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className={styles.searchInput}
                    />
                    <FontAwesomeIcon
                        icon={faSearch}
                        className={styles.searchIcon}
                    />
                </section>
                <section className={styles.eventsSection}>
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => {
                            // Calculate percentage used from event budget.
                            const percentageUsed = event.eventBudget
                                ? Math.round(
                                      (event.totalAmountSpent /
                                          event.eventBudget) *
                                          100
                                  )
                                : 0;
                            return (
                                <div
                                    key={event.id}
                                    className={styles.eventCard}
                                >
                                    {event.EventStaffs.financeUser === null && (
                                        <span className={styles.orphanLabel}>
                                            Orphan Event
                                        </span>
                                    )}
                                    <h3 className={styles.eventTitle}>
                                        {event.title}
                                    </h3>
                                    <p className={styles.eventDate}>
                                        <FontAwesomeIcon icon={faCalendarAlt} />{" "}
                                        {event.startDate} - {event.endDate}
                                    </p>
                                    <p className={styles.eventLocation}>
                                        <FontAwesomeIcon
                                            icon={faMapMarkerAlt}
                                        />{" "}
                                        {event.location}
                                    </p>
                                    <p className={styles.eventDescription}>
                                        {event.description}
                                    </p>

                                    <div className={styles.options}>
                                        <button
                                            className={styles.optionButton}
                                            onClick={() => openBudgetModal(event)}
                                            disabled={loadingAssign}
                                        >
                                            <FontAwesomeIcon icon={faDollarSign} className={styles.optionIcon} />{" "}
                                            {event.EventStaffs.financeUser === null
                                                ? loadingAssign
                                                    ? "Assigning..."
                                                    : "Assign to me & Update Budget"
                                                : "Update Budget"}
                                        </button>
                                        {event.EventStaffs.financeUser !== null && (
                                            <button
                                                className={styles.optionButton}
                                                onClick={(e) => openStatsModal(event, e)}
                                            >
                                                <FontAwesomeIcon icon={faChartPie} className={styles.optionIcon} />{" "}
                                                See Stats ({percentageUsed}%)
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className={styles.noEventsMessage}>
                            No finance events found.
                        </p>
                    )}
                </section>
            </main>
            {selectedEvent && (
                <FinanceEventDetailsModal
                    event={selectedEvent}
                    onClose={closeBudgetModal}
                    onUpdateBudget={handleUpdateBudget}
                />
            )}
            {selectedStatsEvent && (
                <FinanceEventStatsModal
                    event={selectedStatsEvent}
                    onClose={closeStatsModal}
                />
            )}
        </div>
    );
};

export default FinanceEventsPage;
