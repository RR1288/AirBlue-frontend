// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlaneDeparture,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import getData from "../utils/getData";
import { useNotifications } from "../components/NotificationProvider";
import styles from "./FlightSearchPage.module.css";

const FlightSearchPage = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();

  const [searchQuery, setSearchQuery] = useState({
    origin: "",
    destination: "",
    departureDate: new Date().toISOString().slice(0, 10),
    returnDate: new Date().toISOString().slice(0, 10),
    class: "",
  });
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery({ ...searchQuery, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const departure = new Date(searchQuery.departureDate);
    const retDate = new Date(searchQuery.returnDate);
    if (departure > retDate) {
      alert("Departure date must be before the return date.");
      return;
    }

    // Convert dates to yyyy-mm-dd format
    const formattedDepartureDate = departure.toISOString().split("T")[0];
    const formattedReturnDate = retDate.toISOString().split("T")[0];

    // Construct the endpoint URL with query parameters
    const endpoint = `/flights/create-request?origin=${encodeURIComponent(
      searchQuery.origin
    )}&destination=${encodeURIComponent(
      searchQuery.destination
    )}&departureDate=${formattedDepartureDate}&returnDate=${formattedReturnDate}&class=${encodeURIComponent(
      searchQuery.class
    )}`;

    try {
      setLoading(true);
      const response = await getData("GET", endpoint);
      if (response.ok) {
        const data = await response.json();
        setFlights(data.flights || []); // Adjust based on your API response structure
        addNotification({
          title: "Success",
          message: "Flights fetched successfully!",
          type: "success",
        });
      } else {
        alert("Flight fetching failed. Please try again.");
      }
    } catch (err) {
      console.error("Error fetching flights:", err);
      setError(err.message);
      addNotification({
        title: "Error",
        message: err.message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <Header title="AirBlue System" />

      <div className={styles.mainContent}>
      <div className={styles.headerRow}>
          <Link to={`/my-events`} className={styles.backButton}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <h2 className={styles.pageTitle}>Manage Attendees</h2>
        </div>

        <p className={styles.description}>
          Explore flights! Search for flights to visit the event.
        </p>

        <form className={styles.searchContainer} onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Origin:</label>
            <input
              type="text"
              name="origin"
              placeholder="Airport code"
              value={searchQuery.origin}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Destination:</label>
            <input
              type="text"
              name="destination"
              placeholder="Airport code"
              value={searchQuery.destination}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Departure Date:</label>
            <input
              type="date"
              name="departureDate"
              value={searchQuery.departureDate}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Return Date:</label>
            <input
              type="date"
              name="returnDate"
              value={searchQuery.returnDate}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Class:</label>
            <select
              name="class"
              value={searchQuery.class}
              onChange={handleChange}
              className={styles.input}
            >
              <option value="">Select Class</option>
              <option value="economy">Economy</option>
              <option value="premium_economy">Premium Economy</option>
              <option value="business">Business</option>
              <option value="first">First</option>
            </select>
          </div>
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>

        {loading && <p className={styles.loading}>Loading flights...</p>}
        {error && (
          <p className={styles.error} style={{ color: "red" }}>
            Error: {error}
          </p>
        )}

        <div className={styles.flightsContainer}>
          {flights.length > 0 ? (
            flights.map((flight) => (
              <div key={flight.id} className={styles.card}>
                <FontAwesomeIcon
                  icon={faPlaneDeparture}
                  className={styles.cardIcon}
                />
                <h3 className={styles.cardTitle}>{flight.destination}</h3>
                <p className={styles.cardText}>Price: ${flight.cost}</p>
                <p className={styles.cardText}>
                  Departure: {flight.departure_time}
                </p>
              </div>
            ))
          ) : (
            !loading && <p className={styles.noFlights}>No flights available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightSearchPage;
