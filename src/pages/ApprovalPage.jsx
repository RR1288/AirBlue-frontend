// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import styles from "./ApprovalPage.module.css";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faTimesCircle,
    faArrowLeft,
    faEye,
    faSearch,
    faHourglassHalf,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import FlightDetailsModal from "./FlightDetailsModal";
import getData from "../utils/getData";
import { useNotifications } from "../components/NotificationProvider";

const ApprovalPage = () => {
    // Get event from location state (includes groupEventBudget, threshold, etc.)
    const location = useLocation();
    const event = location.state.event;

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredAttendees, setFilteredAttendees] = useState([]);
    const [loading, setLoading] = useState(false);
    // Flat list of attendees for the event
    const [attendees, setAttendees] = useState([]);
    const { addNotification } = useNotifications();

    useEffect(() => {
        fetchAttendeesData();
    }, []);

    const fetchAttendeesData = async () => {
        setLoading(true);
        console.log(event);
        try {
            const response = await getData(
                "GET",
                `/events/getAllAttendees?eventId=${event.id}`
            );
            if (!response.ok) throw new Error("Failed to fetch attendees data");
            const res = await response.json();
            setAttendees(res.data);
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

    // State for modal management
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Open modal with flight details for a specific attendee
    const openFlightModal = (attendee) => {
        setSelectedFlight(attendee);
        setModalOpen(true);
    };

    // Close modal
    const closeFlightModal = () => {
        setSelectedFlight(null);
        setModalOpen(false);
    };

    // Update flight status for a specific attendee (flat update)
    const updateAttendeeStatus = (attendeeEmail, action) => {
        setAttendees(
            attendees.map((a) =>
                a.email === attendeeEmail
                    ? {
                          ...a,
                          Booking: [{ ...a.Booking[0], status: action }],
                      }
                    : a
            )
        );
        closeFlightModal();
    };

    // Approve, reject, or cancel flight directly from the table
    const handleDirectAction = (attendee, action) => {
        setAttendees(
            attendees.map((a) =>
                a.id === attendee.id ? { ...a, flightStatus: action } : a
            )
        );
    };

    useEffect(() => {
        setFilteredAttendees(
            attendees.filter((attendee) =>
                attendee.Name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, attendees]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Returns a status chip with a color and an icon based on flightStatus.
    // If no status is present, it will show "No flight selected yet".
    const getStatusChip = (status) => {
        let chipClass = "";
        let icon = null;
        if (!status) {
            chipClass = styles.chipNoStatus;
            return (
                <span className={`${styles.chip} ${chipClass}`}>
                    No flight selected yet
                </span>
            );
        }
        switch (status.toLowerCase()) {
            case "approved":
                chipClass = styles.chipApproved;
                icon = <FontAwesomeIcon icon={faCheckCircle} />;
                break;
            case "rejected":
                chipClass = styles.chipRejected;
                icon = <FontAwesomeIcon icon={faTimesCircle} />;
                break;
            case "cancelled":
                chipClass = styles.chipCancelled;
                icon = <FontAwesomeIcon icon={faTimesCircle} />;
                break;
            case "pending":
            default:
                chipClass = styles.chipPending;
                icon = <FontAwesomeIcon icon={faHourglassHalf} />;
                break;
        }
        return (
            <span className={`${styles.chip} ${chipClass}`}>
                {icon} {status}
            </span>
        );
    };

    // Determine which action button to show based on flight cost vs. group budget.
    // If no flight status exists, only show the "Send Reminder" button.
    const getActionButton = (attendee) => {

        // Find the attendee's group in event.EventGroups
        const group = event.EventGroups.find(
            (g) => g.Name === attendee.groupName
        );
        if (!group) {
            console.warn(`No budget found for group: ${attendee.groupName}`);
            return null;
        }

        // Get the budget for this attendee's group (convert string to number)
        const budget = parseFloat(group.FlightBudget) || 1000;
        const cost = parseFloat(attendee?.Booking[0]?.cost);
        const status = attendee?.Booking[0]?.status;

        // If no flight status, render only the "Send Reminder" button
        if (!status) {
            return (
                <button
                    className={styles.reminderButton}
                    onClick={(e) => {
                        e.stopPropagation();
                        // Stub code: implement the send reminder action here.
                        console.log("Send reminder clicked for", attendee.email);
                    }}
                >
                    Send Reminder
                </button>
            );
        }

        // Get event's threshold for decision-making
        const reviewThreshold = parseFloat(event.threshold) || 100;

        // If flight is already approved, show Cancel button
        if (status.toLowerCase() === "approved") {
            return (
                <button
                    className={styles.cancelButton}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDirectAction(attendee, "cancelled");
                    }}
                >
                    <FontAwesomeIcon icon={faTimesCircle} /> Cancel
                </button>
            );
        }

        // For rejected or cancelled flights, no action buttons
        if (["rejected", "cancelled"].includes(status.toLowerCase()))
            return null;

        // If cost is within budget, show Approve button
        if (cost <= budget) {
            return (
                <button
                    className={styles.approveButton}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDirectAction(attendee, "approved");
                    }}
                >
                    <FontAwesomeIcon icon={faCheckCircle} /> Approve
                </button>
            );
        }
        // If cost exceeds (budget + threshold), show Reject button
        else if (cost > budget + reviewThreshold) {
            return (
                <button
                    className={styles.rejectButton}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDirectAction(attendee, "rejected");
                    }}
                >
                    <FontAwesomeIcon icon={faTimesCircle} /> Reject
                </button>
            );
        }
        // Otherwise, show a Review button that opens the modal
        else {
            return (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        openFlightModal(attendee);
                    }}
                >
                    <FontAwesomeIcon icon={faEye} /> Review
                </button>
            );
        }
    };

    return (
        <div className={styles.page}>
            <Header title="AirBlue System" />
            <div className={styles.mainContent}>
                <div className={styles.headerRow}>
                    <Link to="/home" className={styles.backButton}>
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            className={styles.icon}
                        />
                    </Link>
                    <h1 className={styles.title}>Approval Requests</h1>
                </div>

                <section className={styles.searchSection}>
                    <input
                        type="text"
                        placeholder="Search events or users..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className={styles.searchInput}
                    />
                    <FontAwesomeIcon
                        icon={faSearch}
                        className={styles.searchIcon}
                    />
                </section>
                <p className={styles.description}>
                    Review and manage your assigned events and flight approvals.
                </p>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.th}>Attendee</th>
                                <th className={styles.th}>Cost</th>
                                <th className={styles.th}>Status</th>
                                <th className={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <p className={styles.loading}>
                                    Loading events...
                                </p>
                            ) : (
                                filteredAttendees.map((attendee) => (
                                    <tr
                                        key={attendee.email}
                                        className={styles.subRow}
                                    >
                                        <td className={styles.subTd}>
                                            {attendee.Name} (
                                            {attendee.groupName})
                                        </td>
                                        <td className={styles.subTd}>
                                            ${attendee?.Booking[0]?.cost || '0.00'}
                                        </td>
                                        <td className={styles.subTd}>
                                            {getStatusChip(
                                                attendee?.Booking[0]?.status
                                            )}
                                        </td>
                                        <td className={styles.subTd}>
                                            {getActionButton(attendee)}
                                            {attendee?.Booking[0]?.status && <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openFlightModal(attendee);
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faEye} />
                                            </button>}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {modalOpen && (
                <FlightDetailsModal
                    flight={selectedFlight}
                    onClose={closeFlightModal}
                    onApprove={(attendeeId) =>
                        updateAttendeeStatus(attendeeId, "Approved")
                    }
                    onReject={(attendeeId) =>
                        updateAttendeeStatus(attendeeId, "Rejected")
                    }
                    onCancel={(attendeeId) =>
                        updateAttendeeStatus(attendeeId, "Cancelled")
                    }
                />
            )}
        </div>
    );
};

export default ApprovalPage;
