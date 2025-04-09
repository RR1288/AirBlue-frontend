// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./EventGroupModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {getData} from "../utils/getData";
import { useNotifications } from "./NotificationProvider";
import { useAuth } from "../context/AuthContext";

const EventGroupModal = ({ event, onClose, onUpdateGroups }) => {
  const { addNotification } = useNotifications();
  const [groups, setGroups] = useState(event.EventGroups || []);
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const {token} = useAuth();

  // Update local groups state whenever event.EventGroups changes
  useEffect(() => {
    setGroups(event.EventGroups || []);
  }, [event.EventGroups]);

  const handleAddGroup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body = {
        eventID: event.id,
        name,
        budget: parseFloat(budget),
      };
      const response = await getData("POST", "/events/create-event-group", token, body);
      if (!response.ok) throw new Error("Failed to create event group");
      const data = await response.json();
      console.log(data);
      addNotification({
        title: "Success",
        message: "Event group created successfully!",
        type: "success",
      });
      setName("");
      setBudget("");

      // Call parent's fetchEvents to refresh event data
      if (onUpdateGroups) onUpdateGroups();
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

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2>Manage Event Groups</h2>
        <div className={styles.groupsList}>
          <h3>Existing Groups</h3>
          {groups.length > 0 ? (
            <ul>
              {groups.map((group) => (
                <li key={group.EventGroupID}>
                  {group.Name} – Budget: ${group.FlightBudget}
                </li>
              ))}
            </ul>
          ) : (
            <p>No groups available.</p>
          )}
        </div>
        <div className={styles.addGroupForm}>
          <h3>Add New Group</h3>
          <form onSubmit={handleAddGroup}>
            <div className={styles.formGroup}>
              <label htmlFor="groupName">Group Name</label>
              <input
                type="text"
                id="groupName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="groupBudget">Budget</label>
              <input
                type="number"
                id="groupBudget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Group"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

EventGroupModal.propTypes = {
  event: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdateGroups: PropTypes.func,
};

export default EventGroupModal;
