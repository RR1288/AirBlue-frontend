// eslint-disable-next-line no-unused-vars
import React, {useState} from "react";
import {useLocation, Link} from "react-router-dom";
import Header from "../components/Header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import getData from "../utils/getData";
import {useNotifications} from "../components/NotificationProvider";
import styles from "./FlightSearchPage.module.css";

const FlightSearchPage = () => {
    const location = useLocation();
    const {addNotification} = useNotifications();

    // Retrieve the event from location state
    const event = location.state?.event;
    const flightBudget = event ? event.flightBudget : "N/A";

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
        const {name, value} = e.target;
        setSearchQuery({...searchQuery, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const departure = new Date(searchQuery.departureDate);
        const retDate = new Date(searchQuery.returnDate);
        if (departure > retDate) {
            alert("Departure date must be before the return date.");
            return;
        }

        const formattedDepartureDate = departure.toISOString().split("T")[0];
        const formattedReturnDate = retDate.toISOString().split("T")[0];

        // Construct the flight search endpoint URL with query parameters
        const searchEndpoint = `/flights/create-request?origin=${encodeURIComponent(
            searchQuery.origin
        )}&destination=${encodeURIComponent(
            searchQuery.destination
        )}&departureDate=${formattedDepartureDate}&returnDate=${formattedReturnDate}&class=${encodeURIComponent(
            searchQuery.class
        )}`;

        try {
            setLoading(true);
            // First, create the flight request
            const searchResponse = await getData("GET", searchEndpoint);
            if (!searchResponse.ok) {
                alert("Flight request creation failed. Please try again.");
                return;
            }
            const searchData = await searchResponse.json();
            const requestId = searchData.data.request_id;
            addNotification({
                title: "Success",
                message: "Request created successfully!",
                type: "success",
            });

            // Now, query the flight offers using the request_id.
            // Adjust limit, after, and before as needed.
            const limit = 10;
            const offersEndpoint = `/flights/offers?offer_request_id=${encodeURIComponent(
                requestId
            )}&limit=${limit}`;
            const offersResponse = await getData("GET", offersEndpoint);
            if (!offersResponse.ok) {
                alert("Failed to fetch flight offers. Please try again.");
                return;
            }
            const response = await offersResponse.json();
            const offersData = response.data.offers;
            const flights = offersData.data;
            if (flights.length > 0) {
                console.log(flights);
            }

            setFlights(flights || []);
            addNotification({
                title: "Success",
                message: "Flights fetched successfully!",
                type: "success",
            });
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

    const handleHold = async (flightId, passengerId) => {
        try {
            // Check if flight is still available
            // if not refresh the page
            // passenger should look like:
            /*
      {
      "phone_number": "+442080160508",
      "email": "tony@exmple.com",
      "born_on": "1980-07-24",
      "title": "mr",
      "gender": "m",
      "family_name": "Stark",
      "given_name": "Tony",
      "id": "pas_0000ArlFyquQxuoVMa7UZE"
    }
      */
            let passenger = {
                email: localStorage.getItem("username"),

                // get name from local storage
                family_name: "Stark",
                given_name: "Tony",
                born_on: "1980-07-24",
                title: "mr",
                gender: "m",
                phone_number: "+442080160508",

                id: passengerId,
            };

            const holdEndpoint = `/flights/${encodeURIComponent(
                flightId
            )}/hold`;
            console.log(event);
            console.log(passenger);

            let body = {
                event_id: event.eventId,
                passengers: [passenger],
            };
            const response = await getData("POST", holdEndpoint, body);

            if (!response.ok) {
                throw new Error("Failed to hold the flight. Please try again.");
            }

            addNotification({
                title: "Flight Held",
                message: "Your flight has been held succcessfully.",
                type: "success",
            });
        } catch (err) {
            console.error("Error holding flight", err);
            addNotification({
                title: "Error",
                message: err.message,
                type: "error",
            });
        }
    };

    return (
        <div className={styles.page}>
            <Header title="AirBlue System" />
            <div className={styles.mainContent}>
                <div className={styles.headerRow}>
                    <Link
                        to="/home"
                        className={styles.backButton}
                    >
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            className={styles.icon}
                        />
                        Back
                    </Link>
                    <h1 className={styles.title}>Flight Search</h1>
                </div>
                {event && (
                    <p className={styles.budgetText}>
                        Flight Budget: ${flightBudget}
                    </p>
                )}
                <p className={styles.description}>
                    Explore flights! Search for flights to visit the event.
                </p>
                <form
                    className={styles.searchContainer}
                    onSubmit={handleSubmit}
                >
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
                            <option value="premium_economy">
                                Premium Economy
                            </option>
                            <option value="business">Business</option>
                            <option value="first">First</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className={styles.searchButton}
                    >
                        Search
                    </button>
                </form>
                {loading && (
                    <div>
                        <p className={styles.loading}>Loading flights...</p>
                        <span className={styles.loader} ></span>
                    </div>
                )}
                {error && (
                    <p
                        className={styles.error}
                        style={{color: "red"}}
                    >
                        Error: {error}
                    </p>
                )}
                <div className={styles.flightsContainer}>
                    {flights.length > 0
                        ? flights.map((flight) => (
                              <div
                                  key={flight.id}
                                  className={styles.card}
                              >
                                  <img
                                      width={50}
                                      height={50}
                                      src={flight.owner.logo_symbol_url}
                                      alt="Airline Logo"
                                  />

                                  <h3 className={styles.cardTitle}>
                                      {flight.owner.name}
                                  </h3>
                                  <p className={styles.cardText}>
                                      Price: ${flight.total_amount}
                                  </p>
                                  <p className={styles.cardText}>
                                      Tax: ${flight.tax_amount}
                                  </p>

                                  {/* Outbound Flight */}
                                  <div className={styles.flightSegment}>
                                      <h4 className={styles.segmentTitle}>
                                          Outbound Flight
                                      </h4>
                                      <p className={styles.cardText}>
                                          {flight.slices[0].origin.iata_code}{" "}
                                          <FontAwesomeIcon
                                              icon={faArrowRight}
                                              className={styles.icon}
                                          />{" "}
                                          {
                                              flight.slices[0].destination
                                                  .iata_code
                                          }
                                      </p>
                                      <p className={styles.cardText}>
                                          Duration: {flight.slices[0].duration}
                                      </p>
                                  </div>

                                  {/* Return Flight (if available) */}
                                  {flight.slices.length > 1 && (
                                      <div className={styles.flightSegment}>
                                          <h4 className={styles.segmentTitle}>
                                              Return Flight
                                          </h4>
                                          <p className={styles.cardText}>
                                              {
                                                  flight.slices[1].origin
                                                      .iata_code
                                              }{" "}
                                              <FontAwesomeIcon
                                                  icon={faArrowRight}
                                                  className={styles.icon}
                                              />
                                              {
                                                  flight.slices[1].destination
                                                      .iata_code
                                              }
                                          </p>
                                          <p className={styles.cardText}>
                                              Duration:{" "}
                                              {flight.slices[1].duration}
                                          </p>
                                      </div>
                                  )}
                                  <button
                                      onClick={() =>
                                          handleHold(
                                              flight.id,
                                              flight?.passengers[0]?.id
                                          )
                                      }
                                  >
                                      Hold
                                  </button>
                              </div>
                          ))
                        : !loading && (
                              <p className={styles.noFlights}>
                                  No flights available
                              </p>
                          )}
                </div>
            </div>
        </div>
    );
};

export default FlightSearchPage;
