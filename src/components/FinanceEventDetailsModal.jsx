// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNotifications } from "./NotificationProvider";
import styles from "./FinanceEventDetailsModal.module.css";

const FinanceEventDetailsModal = ({ event, onClose, onUpdateBudget }) => {
  const [eventBudget, setEventBudget] = useState(event.eventBudget || 0);
  const [flightBudgetPerAttendee, setFlightBudgetPerAttendee] = useState(
    event.flightBudgetPerAttendee || 0
  );
  const { addNotification } = useNotifications();

  const handleSubmit = (e) => {
    e.preventDefault();
    // If event is orphan, assign it to the current finance user (hardcoded here)
    const assignedFinanceUser = event.financeUser || "FinanceUser1";
    const updatedEvent = {
      ...event,
      eventBudget,
      flightBudgetPerAttendee,
      financeUser: assignedFinanceUser,
      // For an orphan event, you might want to initialize other fields as needed:
      totalAmountSpent: event.totalAmountSpent || 0,
      maxAttendees: event.maxAttendees || 0,
      bookedAttendees: event.bookedAttendees || 0,
    };
    onUpdateBudget(updatedEvent);

    addNotification({
      title: "Success",
      message: "Budget updated successfully!",
      type: "success",
    });

    setTimeout(() => {
      onClose();
    }, 1500);
  };


  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2>{event.title}</h2>
        <p>
          <strong>Date:</strong> {event.startDate} - {event.endDate}
        </p>
        <p>
          <strong>Location:</strong> {event.location}
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="eventBudget">Event Budget</label>
          <input
            id="eventBudget"
            type="number"
            value={eventBudget}
            onChange={(e) => setEventBudget(Number(e.target.value))}
            required
            min="0"
          />
          <label htmlFor="flightBudgetPerAttendee">Flight Budget Per Attendee</label>
          <input
            id="flightBudgetPerAttendee"
            type="number"
            value={flightBudgetPerAttendee}
            onChange={(e) => setFlightBudgetPerAttendee(Number(e.target.value))}
            required
            min="0"
          />
          <button type="submit">
            {event.financeUser === null ? "Assign & Save" : "Save Budget"}
          </button>
        </form>
      </div>
    </div>
  );
};

FinanceEventDetailsModal.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string,
    eventBudget: PropTypes.number,
    flightBudgetPerAttendee: PropTypes.number,
    totalAmountSpent: PropTypes.number,
    maxAttendees: PropTypes.number,
    bookedAttendees: PropTypes.number,
    financeUser: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdateBudget: PropTypes.func.isRequired,
};

export default FinanceEventDetailsModal;