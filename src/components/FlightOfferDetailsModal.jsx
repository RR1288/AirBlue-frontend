// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './FlightOfferDetailsModal.module.css';

const FlightOfferDetailsModal = ({ offer, onClose, onHoldOffer }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2>Flight Offer Details</h2>
        <p>
          <strong>Offer ID:</strong> {offer.id}
        </p>
        <p>
          <strong>Total Amount:</strong> {offer.total_amount} {offer.total_currency}
        </p>
        <p>
          <strong>Duration:</strong> {offer.slices && offer.slices[0]?.duration}
        </p>
        {offer.total_emissions_kg && (
          <p>
            <strong>Total Emissions (kg):</strong> {offer.total_emissions_kg}
          </p>
        )}
        {offer.payment_requirements && (
          <>
            <p>
              <strong>Instant Payment Required:</strong>{' '}
              {offer.payment_requirements.requires_instant_payment ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Payment Required By:</strong>{' '}
              {offer.payment_requirements.payment_required_by}
            </p>
          </>
        )}
        {offer.accepted_loyalty_programmes && (
          <p>
            <strong>Accepted Loyalty Programmes:</strong>{' '}
            {offer.accepted_loyalty_programmes.join(', ')}
          </p>
        )}
        <button className={styles.holdButton} onClick={() => onHoldOffer(offer.id)}>
          Hold Offer
        </button>
      </div>
    </div>
  );
};

FlightOfferDetailsModal.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    total_amount: PropTypes.string.isRequired,
    total_currency: PropTypes.string.isRequired,
    slices: PropTypes.arrayOf(
      PropTypes.shape({
        duration: PropTypes.string,
      })
    ),
    total_emissions_kg: PropTypes.string,
    payment_requirements: PropTypes.shape({
      requires_instant_payment: PropTypes.bool,
      payment_required_by: PropTypes.string,
    }),
    accepted_loyalty_programmes: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onHoldOffer: PropTypes.func.isRequired,
};

export default FlightOfferDetailsModal;
