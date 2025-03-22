import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faFilter,
  faUpload,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import getData from "../utils/getData";
import { useNotifications } from "../components/NotificationProvider";
import styles from "./ManageAttendees.module.css";

// A stub for the bulk invitation modal
const BulkInvitationModal = ({ onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Send Bulk Invitations</h2>
        <p>Upload your .csv or .txt file here.</p>
        <button onClick={onClose} className={styles.closeModalButton}>
          Close
        </button>
      </div>
    </div>
  );
};

const ManageAttendees = () => {
  const { eventId } = useParams();
  const { addNotification } = useNotifications();

  // Data returned from the API: two lists for accepted attendees and pending invitations.
  const [data, setData] = useState({ attendees: [], pending: [] });
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("attendees"); // "attendees" or "pending"
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [showBulkModal, setShowBulkModal] = useState(false);

  useEffect(() => {
    fetchAttendeesData();
  }, [eventId]);

  const fetchAttendeesData = async () => {
    setLoading(true);
    try {
      // Expected API endpoint returns { attendees: [...], pending: [...] }
      const response = await getData("GET", `/attendees/${eventId}`);
      if (!response.ok) throw new Error("Failed to fetch attendees data");
      const res = await response.json();
      const result = res.data;
      setData({
        attendees: result.attendees, // Accepted attendees with attributes: name, email, expectedAttendees, maxAttendees, etc.
        pending: result.pendingInvitations, // Pending invitations with attributes: email, status ("sent", "expired", "declined")
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

  // Filter and sort the list based on the current tab
  const getFilteredAndSortedData = () => {
    console.log(data);
    
    const list = selectedTab === "attendees" ? data.attendees : data.pending;
    let filtered = list.filter((item) => {
      // For attendees, filter on name or email; for pending, filter on email.
      if (selectedTab === "attendees") {
        return (
          item.User.FName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.User.Email?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else {
        return item.invitedEmail?.toLowerCase().includes(searchQuery.toLowerCase());
      }
    });
    if (sortColumn) {
      filtered.sort((a, b) => {
        const aVal = a[sortColumn] ? a[sortColumn].toString().toLowerCase() : "";
        const bVal = b[sortColumn] ? b[sortColumn].toString().toLowerCase() : "";
        if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
        if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      // Toggle sort order if the same column is clicked
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handleRemove = async (emailOrId) => {
    // Stub: Remove the attendee/invitation (using email for pending, id for attendee)
    addNotification({
      title: "Success",
      message: "Removed successfully!",
      type: "success",
    });
    fetchAttendeesData();
  };

  const handleResendInvitation = async (email) => {
    // Stub: Resend invitation for the given email
    addNotification({
      title: "Success",
      message: "Invitation resent!",
      type: "success",
    });
    fetchAttendeesData();
  };

  return (
    <div className={styles.container}>
      <Header title="AirBlue System" />
          <main className={styles.main}>
    
        {/* Header with back button and event title */}
        <div className={styles.headerRow}>
          <Link to={`/manage-events`} className={styles.backButton}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <h2 className={styles.pageTitle}>Manage Attendees</h2>
        </div>

        {/* Tabs for Attendees and Pending */}
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

        {/* Search input */}
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FontAwesomeIcon icon={faFilter} className={styles.filterIcon} />
        </div>

        {/* Bulk Invitations Button */}
        <div className={styles.bulkContainer}>
          <button
            className={styles.bulkButton}
            onClick={() => setShowBulkModal(true)}
          >
            <FontAwesomeIcon icon={faUpload} className={styles.bulkIcon} /> Send
            Bulk Invitations
          </button>
        </div>

        {/* Data Table */}
        {loading ? (
          <p className={styles.loading}>Loading...</p>
        ) : (
          <table className={styles.dataTable}>
            <thead>
              <tr>
                {selectedTab === "attendees" ? (
                  <>
                    <th onClick={() => handleSort("name")}>
                      Name <FontAwesomeIcon icon={faSort} />
                    </th>
                    <th onClick={() => handleSort("email")}>
                      Email <FontAwesomeIcon icon={faSort} />
                    </th>
                    <th>Actions</th>
                  </>
                ) : (
                  <>
                    <th onClick={() => handleSort("email")}>
                      Email <FontAwesomeIcon icon={faSort} />
                    </th>
                    <th>Status</th>
                    <th>Actions</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {getFilteredAndSortedData().map((item, index) => (
                <tr key={index}>
                  {console.log(item)}
                  {selectedTab === "attendees" ? (
                    <>
                      <td>{item.User.FName + " " + item.User.LName}</td>
                      <td>{item.User.Email}</td>
                      <td>
                        <button
                          className={styles.actionButton}
                          onClick={() => handleRemove(item.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{item.invitedEmail}</td>
                      <td>
                        <span
                          className={`${styles.chip} ${
                            styles[item.status] || ""
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>
                        {item.status === "expired" && (
                          <button
                            className={styles.actionButton}
                            onClick={() => handleResendInvitation(item.email)}
                          >
                            Resend
                          </button>
                        )}
                        <button
                          className={styles.actionButton}
                          onClick={() => handleRemove(item.email)}
                        >
                          Remove
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
      {showBulkModal && (
        <BulkInvitationModal onClose={() => setShowBulkModal(false)} />
      )}
    </div>
  );
};

export default ManageAttendees;
