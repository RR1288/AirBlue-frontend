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

const FinanceEventsPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedStatsEvent, setSelectedStatsEvent] = useState(null);

    const [events, setEvents] = useState([
        {
            id: 1,
            title: "Company Financial Review",
            startDate: "2025-04-20",
            endDate: "2025-04-22",
            location: "Headquarters",
            description:
                "Annual financial review for shareholders and stakeholders.",
            eventBudget: 10000,
            flightBudgetPerAttendee: 500,
            totalAmountSpent: 4000, // from system
            maxAttendees: 100,
            bookedAttendees: 40,
            financeUser: "FinanceUser1",
        },
        {
            id: 2,
            title: "Budget Allocation Meeting",
            startDate: "2025-05-13",
            endDate: "2025-05-15",
            location: "Finance Boardroom",
            description:
                "Meeting to discuss and allocate budgets for upcoming projects.",
            eventBudget: 20000,
            flightBudgetPerAttendee: 700,
            totalAmountSpent: 5000, // from system
            maxAttendees: 150,
            bookedAttendees: 60,
            financeUser: "FinanceUser1",
        },
        {
            id: 3,
            title: "Orphan Event Example",
            startDate: "2025-06-01",
            endDate: "2025-06-02",
            location: "TBD",
            description:
                "This is an orphan event with no finance user assigned yet.",
            eventBudget: null,
            flightBudgetPerAttendee: null,
            totalAmountSpent: 0,
            maxAttendees: 0,
            bookedAttendees: 0,
            financeUser: null,
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

    const openBudgetModal = (event) => {
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

    // Update event budget details in state.
    const handleUpdateBudget = (updatedEvent) => {
        setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event.id === updatedEvent.id ? updatedEvent : event
            )
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
                                    {event.financeUser === null && (
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
                                            onClick={() =>
                                                openBudgetModal(event)
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={faDollarSign}
                                                className={styles.optionIcon}
                                            />{" "}
                                            {event.financeUser === null
                                                ? "Assign to me & Update Budget"
                                                : "Update Budget"}
                                        </button>
                                        {event.financeUser !== null && (
                                            <button
                                                className={styles.optionButton}
                                                onClick={(e) =>
                                                    openStatsModal(event, e)
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faChartPie}
                                                    className={
                                                        styles.optionIcon
                                                    }
                                                />{" "}
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
