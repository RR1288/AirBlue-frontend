// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from "react";
import {useParams, Link, useLocation} from "react-router-dom";
import Header from "../components/Header";
import BulkInvitationModal from "../components/BulkInvitationModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faFilter,
    faUpload,
    faSort,
    faUserPlus,
    faTimes,
    faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {getData} from "../utils/getData";
import {useNotifications} from "../components/NotificationProvider";
import styles from "./ManageAttendees.module.css";
import {useAuth} from "../context/AuthContext";

// Single Invitation Modal with Event Group dropdown
const SingleInvitationModal = ({eventId, eventGroups, onClose, onSend}) => {
    const [email, setEmail] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");
    const [error, setError] = useState("");

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSend = () => {
        if (!email.trim()) {
            setError("Email is required.");
            return;
        }
        if (!validateEmail(email)) {
            setError("Invalid email format.");
            return;
        }
        if (!selectedGroup) {
            setError("Please select an event group.");
            return;
        }
        setError("");
        onSend(email, selectedGroup);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Send Single Invitation</h2>
                <input
                    type="email"
                    placeholder="Enter email..."
                    className={styles.inputField}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <select
                    className={styles.inputField}
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                >
                    <option value="">Select Event Group</option>
                    {eventGroups[0].map((group) => (
                        <option
                            key={group.EventGroupID}
                            value={group.EventGroupID}
                        >
                            {group.Name}
                        </option>
                    ))}
                </select>
                {error && <p className={styles.errorText}>{error}</p>}
                <div className={styles.modalActions}>
                    <button
                        onClick={handleSend}
                        className={styles.sendButton}
                    >
                        <FontAwesomeIcon icon={faPaperPlane} /> Send Invitation
                    </button>
                    <button
                        onClick={onClose}
                        className={styles.closeModalButton}
                    >
                        <FontAwesomeIcon icon={faTimes} /> Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const ManageAttendees = () => {
    const {eventId} = useParams();
    const location = useLocation();
    const event = location.state.event;
    

    const {addNotification} = useNotifications();

    // State for attendees and pending invitations
    const [data, setData] = useState({attendees: [], pending: []});
    const [loading, setLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState("attendees"); // "attendees" or "pending"
    const [searchQuery, setSearchQuery] = useState("");
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    // State for modals
    const [showBulkModal, setShowBulkModal] = useState(false);
    const [showSingleModal, setShowSingleModal] = useState(false);
    // State for event groups (for single invitation)
    const [eventGroups, setEventGroups] = useState([event.EventGroups]);

    const {token} = useAuth();

    useEffect(() => {
        fetchAttendeesData();
    }, [eventId]);

    // Fetch attendees and pending invitations
    const fetchAttendeesData = async () => {
        setLoading(true);
        try {
            const response = await getData(
                "GET",
                `/attendees/${eventId}`,
                token
            );
            if (!response.ok) throw new Error("Failed to fetch attendees data");
            const res = await response.json();
            setData({
                attendees: res.data.attendees,
                pending: res.data.pendingInvitations,
            });
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

    const handleSendInvitation = async (email, eventGroupId) => {
        try {
            const response = await getData(
                "POST",
                `/attendees/invite/${eventId}`,
                token,
                {
                    email: email,
                    eventGroupId: eventGroupId,
                }
            );
            if (!response.ok) throw new Error("Failed to send invitation");
            addNotification({
                title: "Success",
                message: "Invitation sent successfully!",
                type: "success",
            });
            setShowSingleModal(false);
            fetchAttendeesData();
        } catch (error) {
            addNotification({
                title: "Error",
                message: error.message,
                type: "error",
            });
        }
    };

    const closeBulkModal = () => {
      setShowBulkModal(false);
      fetchAttendeesData();
    };

    const getFilteredAndSortedData = () => {
        const list =
            selectedTab === "attendees" ? data.attendees : data.pending;
        let filtered = list.filter((item) =>
            selectedTab === "attendees"
                ? item.User.FName?.toLowerCase().includes(
                      searchQuery.toLowerCase()
                  ) ||
                  item.User.Email?.toLowerCase().includes(
                      searchQuery.toLowerCase()
                  )
                : item.invitedEmail
                      ?.toLowerCase()
                      .includes(searchQuery.toLowerCase())
        );

        if (sortColumn) {
            filtered.sort((a, b) => {
                const aVal = a[sortColumn]?.toString().toLowerCase() || "";
                const bVal = b[sortColumn]?.toString().toLowerCase() || "";
                return (
                    aVal.localeCompare(bVal) * (sortOrder === "asc" ? 1 : -1)
                );
            });
        }
        return filtered;
    };

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortOrder("asc");
        }
    };

    const removeAttendee = async (item) => {
        const attendeeId = item.AttendeeID;
        const eventId = item.EventID;

        const response = await getData("DELETE", "/attendees/remove", token, {
            eventId,
            userIds: [attendeeId],
        });

        if (!response.ok) {
            addNotification({
                title: "Error",
                message: await response.json().message,
                type: "error",
            });
        } else {
            const res = await response.json();
            addNotification({
                title: "Success",
                message: res.message,
                type: "success",
            });
            fetchAttendeesData();
        }
    };

    const revokeInvitation = async (item) => {
        console.log(item);
        console.log(event);

        const invitationId = item.InvitationID;
        const eventId = event.id;

        const response = await getData(
            "DELETE",
            "/attendees/invite/revoke",
            token,
            {eventId, invitationIds: [invitationId]}
        );

        if (!response.ok) {
            addNotification({
                title: "Error",
                message: await response.json().message,
                type: "error",
            });
        } else {
            const res = await response.json();
            addNotification({
                title: "Success",
                message: res.message,
                type: "success",
            });
            fetchAttendeesData();
        }
    };

    return (
        <div className={styles.container}>
            <Header title="AirBlue System" />
            <main className={styles.main}>
                <div className={styles.headerRow}>
                    <Link
                        to={`/manage-events`}
                        className={styles.backButton}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                    <h2 className={styles.pageTitle}>Manage Attendees</h2>
                </div>

                <div className={styles.sendButtonsContainer}>
                    <button
                        className={styles.bulkButton}
                        onClick={() => setShowSingleModal(true)}
                    >
                        <FontAwesomeIcon
                            icon={faUserPlus}
                            className={styles.bulkIcon}
                        />{" "}
                        Send Single Invitation
                    </button>
                    <button
                        className={styles.bulkButton}
                        onClick={() => setShowBulkModal(true)}
                    >
                        <FontAwesomeIcon
                            icon={faUpload}
                            className={styles.bulkIcon}
                        />{" "}
                        Send Bulk Invitations
                    </button>
                </div>

                <div className={styles.tabs}>
                    <button
                        className={`${styles.tabButton} ${
                            selectedTab === "attendees" && styles.activeTab
                        }`}
                        onClick={() => setSelectedTab("attendees")}
                    >
                        Attendees
                    </button>
                    <button
                        className={`${styles.tabButton} ${
                            selectedTab === "pending" && styles.activeTab
                        }`}
                        onClick={() => setSelectedTab("pending")}
                    >
                        Pending Invitations
                    </button>
                </div>

                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Search..."
                        className={styles.searchInput}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <FontAwesomeIcon
                        icon={faFilter}
                        className={styles.filterIcon}
                    />
                </div>

                {loading ? (
                    <p className={styles.loading}>Loading...</p>
                ) : (
                    <table className={styles.dataTable}>
                        <thead>
                            <tr>
                                <th onClick={() => handleSort("name")}>
                                    Name <FontAwesomeIcon icon={faSort} />
                                </th>
                                <th onClick={() => handleSort("email")}>
                                    Email <FontAwesomeIcon icon={faSort} />
                                </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getFilteredAndSortedData().map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        {selectedTab === "attendees"
                                            ? `${item.User.FName} ${item.User.LName}`
                                            : item.invitedEmail}
                                    </td>
                                    <td>
                                        {selectedTab === "attendees"
                                            ? item.User.Email
                                            : item.invitedEmail}
                                    </td>
                                    <td>
                                        <button
                                            className={styles.actionButton}
                                            onClick={
                                                selectedTab === "attendees"
                                                    ? () => {
                                                          removeAttendee(item);
                                                      }
                                                    : () => {
                                                          revokeInvitation(
                                                              item
                                                          );
                                                      }
                                            }
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </main>
            {showBulkModal && (
                <BulkInvitationModal
                    eventId={eventId}
                    eventGroups={eventGroups}
                    onClose={closeBulkModal}
                />
            )}
            {showSingleModal && (
                <SingleInvitationModal
                    eventId={eventId}
                    eventGroups={eventGroups}
                    onClose={() => setShowSingleModal(false)}
                    onSend={handleSendInvitation}
                />
            )}
        </div>
    );
};

export default ManageAttendees;
