// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faCalendarAlt,
    faMapMarkerAlt,
    faDollarSign,
    faChartLine,
    // faChartPie,
} from "@fortawesome/free-solid-svg-icons";
import FinanceEventDetailsModal from "../components/FinanceEventDetailsModal";
import styles from "./FinanceEventsPage.module.css";
import {useNavigate} from "react-router-dom";
import {getData} from "../utils/getData";
import {useNotifications} from "../components/NotificationProvider";
import {formatDate} from "../utils/formatUtils";
import {useAuth} from "../context/AuthContext";

const FinanceEventsPage = () => {
    const {addNotification} = useNotifications();
    const {token, userId} = useAuth();
    const navigate = useNavigate();
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
            const res = await getData(
                "GET",
                "/events/getAllEventsFinanceView",
                token
            );
            if (!res.ok) throw new Error("Failed to fetch events");
            const data = await res.json();

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
        }
    };

    // const sanitizeBudget = (value) => {
    //     return value.replace(/[^0-9.]/g, "");
    // };

    const updateBudget = async (
        eventId,
        totalBudget,
        flightBudget,
        flightThreshold
    ) => {
        const total = parseFloat(totalBudget);
        const flight = parseFloat(flightBudget);
        const threshold = parseFloat(flightThreshold);

        //validation
        if (
            isNaN(total) ||
            isNaN(flight) ||
            total <= 0 ||
            flight <= 0 ||
            threshold < 0 ||
            threshold > 1
        ) {
            addNotification({
                title: "Warning",
                message: "Budgets must be valid numbers greater than 0!",
                type: "warning",
            });
            return;
        }

        try {
            const res = await getData("POST", "/events/set-budget", token, {
                userId,
                eventID: eventId,
                // totalBudget: sanitizeBudget(total),
                // flightBudget: sanitizeBudget(flight),
                totalBudget: total,
                flightBudget: flight,
                thresholdVal: threshold,
            });
            if (!res.ok) throw new Error("Failed to update budget");
            addNotification({
                title: "Success",
                message: "Budget updated successfully!",
                type: "success",
            });
            fetchEvents();
            // onClose();
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
            const res = await getData(
                "POST",
                "/events/join-eventstaff-finance",
                token,
                {
                    userID: userId,
                    eventID: eventId,
                }
            );
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

    const sanitizeSearch = (term) => {
        return term.replace(/[^a-zA-Z0-9 ]/g, "").trim();
    };

    useEffect(() => {
        setFilteredEvents(
            events.filter((event) =>
                event.title
                    .toLowerCase()
                    .includes(sanitizeSearch(searchTerm).toLowerCase())
            )
        );
    }, [searchTerm, events]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const openBudgetModal = async (event) => {
        if (event.orphan) {
            try {
                await assignEventToMe(event.id);
            } catch (error) {
                console.error(error);
                return; // Prevent opening the modal if assignment fails
            }
        }

        setSelectedEvent(event);
    };

    const closeBudgetModal = () => {
        setSelectedEvent(null);
    };

    const handleUpdateBudget = async (updatedEvent) => {
        await updateBudget(
            updatedEvent.id,
            updatedEvent.eventBudget,
            updatedEvent.flightBudget,
            updatedEvent.flightThreshold
        );
    };

    const viewStats = (event) => {
        console.log("View stats for event:", event);
        setSelectedStatsEvent(event);
        // Navigate to the statistics page
        navigate(`/finance-stats`, { state: { event } });
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
                        filteredEvents.map((event) => (
                            <div
                                key={event.id}
                                className={styles.eventCard}
                            >
                                {event.orphan && (
                                    <span className={styles.orphanLabel}>
                                        Orphan Event
                                    </span>
                                )}
                                <h3 className={styles.eventTitle}>
                                    {event.title}
                                </h3>
                                <p className={styles.eventDate}>
                                    <FontAwesomeIcon icon={faCalendarAlt} />{" "}
                                    {formatDate(event.startDate)} -{" "}
                                    {formatDate(event.endDate)}
                                </p>
                                <p className={styles.eventLocation}>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
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
                                        <FontAwesomeIcon
                                            icon={faDollarSign}
                                            className={styles.optionIcon}
                                        />{" "}
                                        {event.orphan
                                            ? loadingAssign
                                                ? "Assigning..."
                                                : "Assign to me & Update Budget"
                                            : "Update Budget"}
                                    </button>
                                    <button className={styles.optionButton} onClick={() => viewStats(event)} disabled={loadingAssign}> 
                                        <FontAwesomeIcon
                                            icon={faChartLine}
                                            className={styles.optionIcon}
                                        />{" "}
                                        View Statistics
                                    </button>
                                </div>
                            </div>
                        ))
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
        </div>
    );
};

export default FinanceEventsPage;
