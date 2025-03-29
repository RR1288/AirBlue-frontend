// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./FinanceEventStatsModal.module.css";

const FinanceEventStatsModal = ({ event, onClose }) => {
  const flightRatio = event.maxAttendees && event.maxAttendees > 0
    ? Math.round((event.bookedAttendees / event.maxAttendees) * 100)
    : 0;
  
  const budgetRatio = event.eventBudget && event.eventBudget > 0
    ? Math.round((event.totalAmountSpent / event.eventBudget) * 100)
    : 0;
  
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <button className={styles.closeButton} onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <h2>{event.title} - Statistics</h2>
          <div className={styles.statSection}>
            <h3>Flight Booking</h3>
            <p>
              {event.bookedAttendees} of {event.maxAttendees} attendees have booked a flight.
            </p>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${flightRatio}%` }}
              >
                {flightRatio}%
              </div>
            </div>
          </div>
          <div className={styles.statSection}>
            <h3>Budget Usage</h3>
            <p>
              ${event.totalAmountSpent} spent of ${event.eventBudget} total budget.
            </p>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${budgetRatio}%` }}
              >
                {budgetRatio}%
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
FinanceEventStatsModal.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    eventBudget: PropTypes.number.isRequired,
    totalAmountSpent: PropTypes.number.isRequired,
    maxAttendees: PropTypes.number.isRequired,
    bookedAttendees: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FinanceEventStatsModal;
