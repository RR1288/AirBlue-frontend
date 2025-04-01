// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./FlightDetailsModal.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faTimesCircle,
    faHourglassHalf,
} from "@fortawesome/free-solid-svg-icons";
import getData from "../utils/getData";

const FlightDetailsModal = ({
    flight,
    onClose,
    onApprove,
    onReject,
    onCancel,
}) => {

    const [itinerary, setItinerary] = useState({});

    // Example usage in your component (e.g. inside useEffect):
    useEffect(() => {
    const getItineraryForUser = async () => {
      // Replace this with however you obtain the userId (for example, from attendee details)
      const itinerary = await fetchUserItinerary(flight.ID);
      if (itinerary) {
        console.log("Most recent pending itinerary:", itinerary);
        setItinerary(itinerary);
        // Do something with the itinerary (e.g., set state to show details)
    } else {
        console.log("No pending itineraries found for user.");
      }
    };
    
    getItineraryForUser();
  }, []);
  
  if (!flight) return null;
    // A new function to fetch itineraries for a given user
const fetchUserItinerary = async (attendeeId) => {
    try {
      // Adjust the endpoint URL according to your API
      const response = await getData("GET", `/flights/view/getFlightInfo?attendeeId=${attendeeId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch itineraries");
      }
      const data = await response.json();
      
      // Assume the response contains an array of orders in data.orders
      const orders = data.data || [];
      
      // Filter orders with a pending status
    //   const pendingOrders = orders.filter((order) => {
    //     // Here, adjust the property that holds the status.
    //     // For example, if the status is nested in order.Booking[0].status:
    //     return order.ApprovalStatus === "pending";
    //   });
      
    //   // Sort the pending orders by creation date (most recent first)
    //   pendingOrders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      
    //   // Return the most recent pending itinerary (or null if none)
    //   return pendingOrders.length > 0 ? pendingOrders[0] : null;
    return orders[0];
    } catch (error) {
      console.error(error);
      // Optionally show a notification here if needed
      return null;
    }
  };
  
// Helper function to format ISO time strings
const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};


  const renderSegments = () => {
    // Assuming itinerary.Slice is the array of slices
    if (!itinerary || !itinerary.Slice || itinerary.Slice.length === 0) {
        return <p>No segments available.</p>;
    }
    return itinerary.Slice.map((slice, sliceIndex) => (
        <div key={slice.SliceID} className={styles.sliceContainer}>
            <h3 className={styles.sliceTitle}>
                Leg {sliceIndex + 1}: {slice.OriginAirport} ({slice.OriginIATA}){" "}
                &rarr; {slice.DestinationAirport} ({slice.DestinationIATA})
            </h3>
            {slice.Segments.map((segment) => (
                <div key={segment.SegmentID} className={styles.segment}>
                    <div>
                        <strong>Departure:</strong> {segment.OriginAirport} (
                        {segment.OriginIATA}) at {formatTime(segment.OriginTime)}
                    </div>
                    <div>
                        <strong>Arrival:</strong> {segment.DestinationAirport} (
                        {segment.DestinationIATA}) at {formatTime(segment.DestinationTime)}
                    </div>
                    <div>
                        <strong>Duration:</strong> {segment.Duration} minutes
                    </div>
                </div>
            ))}
        </div>
    ));
};
  
    const getStatusIcon = (status) => {
        switch (status) {
            case "approved":
                return (
                    <FontAwesomeIcon
                        icon={faCheckCircle}
                        style={{color: "green", marginRight: "5px"}}
                    />
                );
            case "rejected":
                return (
                    <FontAwesomeIcon
                        icon={faTimesCircle}
                        style={{color: "red", marginRight: "5px"}}
                    />
                );
            case "pending":
            default:
                return (
                    <FontAwesomeIcon
                        icon={faHourglassHalf}
                        style={{color: "#555", marginRight: "5px"}}
                    />
                );
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                {console.dir(flight)}
                <h2>Flight Details</h2>
                <p>
                    <strong>Order ID:</strong> {itinerary.DuffleOrderID}
                </p>
                <p>
                    <strong>Booking reference:</strong> {itinerary.BookingReference}
                </p>
                <div className={styles.segmentsSection}>
                    <h2>Itinerary Segments</h2>
                    {renderSegments()}
                </div>
                <p>
                    <strong>Base Cost:</strong> ${itinerary.BaseCost}
                </p>
                <p>
                    <strong>Tax Cost:</strong> ${itinerary.TaxCost}
                </p>
                <p>
                    <strong>Total Cost:</strong> ${itinerary.TotalCost}
                </p>
                <p>
                    <strong>Status:</strong>{" "}
                    {getStatusIcon(flight.Booking[0].status)}
                    {flight.Booking[0].status}
                </p>
                <div className={styles.actions}>
                    {flight.Booking[0].status === "Pending" && (
                        <>
                            <button
                                onClick={() =>
                                    onApprove(flight.eventId, flight.id)
                                }
                            >
                                <FontAwesomeIcon icon={faCheckCircle} /> Approve
                            </button>
                            <button
                                onClick={() =>
                                    onReject(flight.eventId, flight.id)
                                }
                            >
                                <FontAwesomeIcon icon={faTimesCircle} /> Reject
                            </button>
                        </>
                    )}
                    {flight.flightStatus === "Approved" && (
                        <button
                            onClick={() => onCancel(flight.eventId, flight.id)}
                        >
                            <FontAwesomeIcon icon={faTimesCircle} /> Cancel
                            Flight
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
