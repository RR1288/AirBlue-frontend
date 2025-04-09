// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import styles from "./FlightDetailsModal.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faTimesCircle,
    faHourglassHalf,
} from "@fortawesome/free-solid-svg-icons";
import {getData} from "../utils/getData";
import { useAuth } from "../context/AuthContext";

const FlightDetailsModal = ({
    flight,
    onClose,
    onApprove, // callback from parent to approve the flight
    onReject, // callback from parent to reject the flight
}) => {
    const [itinerary, setItinerary] = useState({});
    const {token} = useAuth();

    // Fetch itinerary info on mount (or when flight changes)
    useEffect(() => {
        const getItineraryForUser = async () => {
            const itin = await fetchUserItinerary(flight.ID);
            if (itin) {
                setItinerary(itin);
            } else {
                console.log("No pending itineraries found for user.");
            }
        };
        getItineraryForUser();
    }, [flight]);

    // Function to fetch itinerary data
    const fetchUserItinerary = async (attendeeId) => {
        try {
            const response = await getData(
                "GET",
                `/flights/view/getFlightInfo?attendeeId=${attendeeId}`, token
            );
            if (!response.ok) throw new Error("Failed to fetch itineraries");
            const data = await response.json();
            const orders = data.data || [];
            return orders[0];
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    // Helper function to format ISO time strings
    const formatTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // Render segments in a timeline view
    const renderSegments = () => {
        if (!itinerary || !itinerary.Slice || itinerary.Slice.length === 0) {
            return <p>No segments available.</p>;
        }
        return itinerary.Slice.map((slice, sliceIndex) => (
            <div
                key={slice.SliceID}
                className={styles.sliceContainer}
            >
                <h3 className={styles.sliceTitle}>
                    Leg {sliceIndex + 1}: {slice.OriginAirport} (
                    {slice.OriginIATA}) &rarr; {slice.DestinationAirport} (
                    {slice.DestinationIATA})
                </h3>
                {slice.Segments.map((segment) => (
                    <div
                        key={segment.SegmentID}
                        className={styles.segment}
                    >
                        <div>
                            <strong>Departure:</strong> {segment.OriginAirport}{" "}
                            ({segment.OriginIATA}) at{" "}
                            {formatTime(segment.OriginTime)}
                        </div>
                        <div>
                            <strong>Arrival:</strong>{" "}
                            {segment.DestinationAirport} (
                            {segment.DestinationIATA}) at{" "}
                            {formatTime(segment.DestinationTime)}
                        </div>
                        <div>
                            <strong>Duration:</strong> {segment.Duration}{" "}
                            minutes
                        </div>
                    </div>
                ))}
            </div>
        ));
    };

    // Render status icon based on current flight status (from flight.Booking[0].status)
    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case "approved":
                return (
                    <FontAwesomeIcon
                        icon={faCheckCircle}
                        style={{color: "green", marginRight: "5px"}}
                    />
                );
            case "denied":
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

    // Render action buttons based on flight status.
    // When pending, show both Approve and Reject.
    const renderActions = () => {
        const status = flight.Booking[0].status.toLowerCase();
        if (status === "pending") {
            return (
                <>
                    <button
                        onClick={async () => {
                            await onApprove(flight.eventId, flight.id);
                            onClose();
                        }}
                    >
                        <FontAwesomeIcon icon={faCheckCircle} /> Approve
                    </button>
                    <button
                        onClick={async () => {
                            await onReject(flight.eventId, flight.id);
                            onClose();
                        }}
                    >
                        <FontAwesomeIcon icon={faTimesCircle} /> Reject
                    </button>
                </>
            );
        }
        return null;
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Flight Details</h2>
                <p>
                    <strong>Order ID:</strong> {itinerary.DuffleOrderID}
                </p>
                <p>
                    <strong>Booking Reference:</strong>{" "}
                    {itinerary.BookingReference}
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
                    {renderActions()}
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
        Booking: PropTypes.arrayOf(
            PropTypes.shape({
                status: PropTypes.string.isRequired,
            })
        ).isRequired,
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
};

export default FlightDetailsModal;
