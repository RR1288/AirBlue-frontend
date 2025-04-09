// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useCallback } from "react";
import Header from "../components/Header";
import styles from "./MyInvitationsPage.module.css";
import { getData } from "../utils/getData";
import { useNotifications } from "../components/NotificationProvider";
import { formatDate } from "../utils/formatUtils";
import { useAuth } from "../context/AuthContext";

const MyInvitationsPage = () => {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const { addNotification } = useNotifications();
  const { token } = useAuth();

  // Helper function to render the status chip based on invitation properties
  const renderStatusChip = (invitation) => {
    const isExpired = new Date(invitation.expiresAt) < new Date();
    if (isExpired) {
      return (
        <div className={`${styles.statusChip} ${styles.past}`}>
          Expired
        </div>
      );
    }
    switch (invitation.status) {
      case "accepted":
        return (
          <div className={`${styles.statusChip} ${styles.approved}`}>
            Accepted
          </div>
        );
      case "declined":
        return (
          <div className={`${styles.statusChip} ${styles.denied}`}>
            Declined
          </div>
        );
      case "pending":
        return (
          <div className={`${styles.statusChip} ${styles.pending}`}>
            Pending
          </div>
        );
      default:
        return null;
    }
  };

  const fetchInvitations = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getData("GET", "/attendees/view/getInvitesAttendeeView", token);
      const data = await response.json();
      if (data.success) {
        setInvitations(data.data);
        addNotification({
          title: "Success",
          message: "Invitations fetched successfully!",
          type: "success",
        });
      } else {
        addNotification({
          title: "Error",
          message: "Failed to fetch invitations",
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
  }, [token, addNotification]);

  // Fetch invitations when component mounts
  useEffect(() => {
    fetchInvitations();
  }, [fetchInvitations]);

  const handleAccept = async (invitation) => {
    try {
      console.log(`Accepting invitation with token: ${invitation.token}`);
      const response = await getData("POST", `/events/invitations/accept?invitation=${encodeURIComponent(invitation.token)}`, token);
      if (!response.ok) {
        throw new Error("Failed to accept invitation");
      }
      const data = await response.json();
      console.log(data);
      addNotification({
        title: "Success",
        message: "Invitation accepted successfully!",
        type: "success",
      });
      await fetchInvitations();
    } catch (error) {
      console.error(error);
      addNotification({
        title: "Error",
        message: error.message,
        type: "error",
      });
    }
  };

  const handleDecline = async (invitation) => {
    try {
      console.log(`Declining invitation with ID: ${invitation.InvitationID}`);
      //const response = await getData("POST", `/events/invitations/decline?invitation=${encodeURIComponent(invitation.token)}`, token);
      // if (!response.ok) { throw new Error("Failed to decline invitation"); }
      addNotification({
        title: "Success",
        message: "Invitation declined successfully!",
        type: "success",
      });
      await fetchInvitations();
    } catch (error) {
      console.error(error);
      addNotification({
        title: "Error",
        message: error.message,
        type: "error",
      });
    }
  };

  // Filter invitations based on search query and filter status
  const filteredInvitations = invitations.filter((invitation) => {
    // const matchesQuery =
    //   invitation.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //   (invitation.description && invitation.description?.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = filterStatus ? invitation.status === filterStatus : true;
    // return matchesQuery && matchesStatus;
    return matchesStatus;
  });

  return (
    <div className={styles.page}>
      <Header title="AirBlue System" />
      <div className={styles.mainContent}>
        <h1 className={styles.h1}>My Invitations</h1>

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
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="denied">Declined</option>
          </select>
        </div>

        {loading ? (
          <p className={styles.loading}>Loading your invitations...</p>
        ) : (
          <>
            {filteredInvitations.length > 0 ? (
              <section className={styles.section}>
                {filteredInvitations.map((invitation) => {
                  // Determine if the invitation is expired.
                  const isExpired = new Date(invitation.expiresAt) < new Date();
                  const isPending = invitation.status === "pending";
                  return (
                    <div key={invitation.InvitationID} className={styles.eventCard}>
                      {/* Status Chip */}
                      {renderStatusChip(invitation)}
                      
                      {/* Invitation message */}
                      <p className={styles.invitationMessage}>
                        {`You've been invited to ${invitation.name} in ${invitation.location}, from ${formatDate(invitation.startDate)} to ${formatDate(invitation.endDate)}`}
                      </p>
                      
                      {/* Render action buttons only for pending and not expired invitations */}
                      {isPending && !isExpired && (
                        <div className={styles.buttonContainer}>
                          <button
                            className={styles.acceptButton}
                            onClick={() => handleAccept(invitation)}
                          >
                            Accept
                          </button>
                          <button
                            className={styles.declineButton}
                            onClick={() => handleDecline(invitation)}
                          >
                            Decline
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </section>
            ) : (
              <p className={styles.noInvitations}>No invitations found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyInvitationsPage;
