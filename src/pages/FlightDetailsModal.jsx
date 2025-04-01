// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import styles from './FlightDetailsModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';

const FlightDetailsModal = ({ flight, onClose, onApprove, onReject, onCancel }) => {
  if (!flight) return null;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved':
        return <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', marginRight: '5px' }} />;
      case 'Rejected':
        return <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red', marginRight: '5px' }} />;
      case 'Pending':
      default:
        return <FontAwesomeIcon icon={faHourglassHalf} style={{ color: '#555', marginRight: '5px' }} />;
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Flight Details</h2>
        <p><strong>Order ID:</strong> {flight.id}</p>
        <p><strong>Slices:</strong> {flight.flightInfo.slices}</p>
        <p><strong>Segments:</strong> {flight.flightInfo.segments}</p>
        <p><strong>Duration:</strong> {flight.flightInfo.duration}</p>
        <p><strong>Cost:</strong> ${flight.flightInfo.cost}</p>
        <p>
          <strong>Status:</strong> {getStatusIcon(flight.flightStatus)}
          {flight.flightStatus}
        </p>
        <div className={styles.actions}>
          {flight.flightStatus === 'Pending' && (
            <>
              <button onClick={() => onApprove(flight.eventId, flight.id)}>
                <FontAwesomeIcon icon={faCheckCircle} /> Approve
              </button>
              <button onClick={() => onReject(flight.eventId, flight.id)}>
                <FontAwesomeIcon icon={faTimesCircle} /> Reject
              </button>
            </>
          )}
          {flight.flightStatus === 'Approved' && (
            <button onClick={() => onCancel(flight.eventId, flight.id)}>
              <FontAwesomeIcon icon={faTimesCircle} /> Cancel Flight
            </button>
          )}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

FlightDetailsModal.propTypes = {
  flight: PropTypes.shape({
    id: PropTypes.number.isRequired,
    eventId: PropTypes.number.isRequired,
    flightStatus: PropTypes.string.isRequired,
    flightInfo: PropTypes.shape({
      slices: PropTypes.string.isRequired,
      segments: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      cost: PropTypes.number.isRequired,
    }).isRequired,
  }),
  onClose: PropTypes.func.isRequired,
  onApprove: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default FlightDetailsModal;
