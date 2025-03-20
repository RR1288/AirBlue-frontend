// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Header from "../components/Header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faCalendarAlt,
    faMapMarkerAlt,
    faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./FinanceEventsPage.module.css";

const FinanceEventsPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [events, setEvents] = useState([
        {
            id: 1,
            title: "Company Financial Review",
            date: "2025-04-22",
            location: "Headquarters",
            description:
                "Annual financial review for shareholders and stakeholders.",
        },
        {
            id: 2,
            title: "Budget Allocation Meeting",
            date: "2025-05-15",
            location: "Finance Boardroom",
            description:
                "Meeting to discuss and allocate budgets for upcoming projects.",
        },
        // Add more placeholder events as needed
    ]);

    // Set the default role based on localStorage (defaults to "attendee" if not set)
    const [selectedRole, setSelectedRole] = useState("attendee");

    useEffect(() => {
        const rolesString = localStorage.getItem("roles") || "";
        if (rolesString !== "") {
            const roleMap = {
                A: "admin",
                E: "eventPlanner",
                F: "financePlanner",
            };
            const availableRoles = rolesString
                .split("")
                .map((letter) => roleMap[letter])
                .filter(Boolean);
            if (availableRoles.length > 0) {
                setSelectedRole(availableRoles[0]);
            }
        }
    }, []);

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

    const handleRoleChange = (newRole) => {
        setSelectedRole(newRole);
    };

    return (
        <div className={styles.container}>
            <Header
                title="AirBlue System"
                userRole={selectedRole}
                onRoleChange={handleRoleChange}
            />
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
                                <h3 className={styles.eventTitle}>
                                    {event.title}
                                </h3>
                                <p className={styles.eventDate}>
                                    <FontAwesomeIcon icon={faCalendarAlt} />{" "}
                                    {new Date(event.date).toLocaleDateString()}
                                </p>
                                <p className={styles.eventLocation}>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                                    {event.location}
                                </p>
                                <p className={styles.eventDescription}>
                                    {event.description}
                                </p>
                                {/* Finance Details Link */}
                                <Link
                                    to={`/finance-details`}
                                    className={styles.financeIcon}
                                >
                                    <FontAwesomeIcon icon={faDollarSign} />
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className={styles.noEventsMessage}>
                            No finance events found.
                        </p>
                    )}
                </section>
            </main>
        </div>
    );
};

export default FinanceEventsPage;
