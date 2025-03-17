import React, { useState } from "react";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faArrowLeft, faFilter } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const ManageEventsPage = () => {
  const navigate = useNavigate();

  // Mock event data
  const [events, setEvents] = useState([
    { id: 1, title: "IEEE Board Meeting 2024", date: "10/31/2024", type: "Board Meeting", location: "Rochester Conference Center" },
    { id: 2, title: "IEEE Conference: ML Research 2024", date: "11/15/2024", type: "Conference", location: "NYC Convention Center" },
  ]);

  // Delete Event
  const handleDeleteEvent = (id) => {
    // TODO: Implement backend API call to delete event
    // fetch(`/api/events/${id}`, { method: "DELETE" })
    //   .then(response => response.json())
    //   .then(data => console.log(data));

    setEvents(events.filter(event => event.id !== id)); // Remove from UI
  };

  return (
    <div style={styles.container}>
      <Header title="AirBlue System" />
      <main style={styles.main}>
        <section style={styles.events}>
          {/* Back Button & Title */}
          <div style={styles.headerRow}>
            <Link to="/home" style={styles.backButton}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
            <h2 style={styles.title}>Manage Events</h2>
          </div>

          {/* Filter Section */}
          <div style={styles.filterContainer}>
            <input type="text" placeholder="Event Title" style={styles.filterInput} />
            <input type="text" placeholder="Event Type" style={styles.filterInput} />
            <FontAwesomeIcon icon={faFilter} style={styles.icon} />
            <button style={styles.clearButton}>Clear Filters</button>
            <button style={styles.searchButton}>Search</button>
            <Link to="/event-creation">
              <button style={styles.searchButton}>Create Event</button>
            </Link>
          </div>

          {/* Event List */}
          {events.map((event) => (
            <div key={event.id} style={styles.eventItem}>
              <div style={styles.eventHeader}>
                <div style={styles.eventDetails}>
                  <p>Date: {event.date}</p>
                  <p>Event Type: {event.type}</p>
                  <p>Location: {event.location}</p>

                  {/* Budget Editing Removed for Event Planners */}
                  {/* <p>Budget per attendee: $300</p> */}
                  {/* <p>Event Budget: $5000</p> */}

                  <p>
                    Attendees:{" "}
                    <a href="/manage-attendees" style={styles.link}>Manage attendees</a>
                  </p>
                </div>

                {/* Icons for Event Management */}
                <div style={styles.iconContainer}>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={styles.icon}
                    onClick={() => navigate(`/event-edit/`)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={styles.icon}
                    onClick={() => handleDeleteEvent(event.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

/* Styles */
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "#ffffff",
    boxSizing: "border-box",
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    maxWidth: "800px",
    marginBottom: "20px",
  },
  backButton: {
    display: "flex",
    alignItems: "left",
    textDecoration: "none",
    marginTop: "160px",
    color: "#0B2853",
    fontSize: "16px",
    fontWeight: "600",
    marginRight: "315px",
    marginLeft: "-345px",
  },
  title: {
    fontSize: "24px",
    marginTop: "160px",
    marginBottom: "5px",
    color: "#0B2853",
    fontWeight: "600",
    marginLeft: "10px",
  },
  month: {
    color: "#0B2853",
  },
  events: {
    width: "100%",
    maxWidth: "800px",
  },
  eventItem: {
    border: "1px solid #ccc",
    backgroundColor: "lightgray",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  eventTitle: {
    marginTop: "0",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    fontSize: "18px",
    fontWeight: "500",
    color: "#0B2853",
  },
  eventDetails: {
    marginTop: "-20px",
    color: "black",
    fontSize: "18px",
  },
  eventHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    position: "relative",
  },
  iconContainer: {
    display: "flex",
    gap: "10px",
    position: "absolute",
    top: "10px",
    right: "10px",
    fontSize: "25px",
  },
  icon: {
    color: "#0A306E",
    fontSize: "16px",
    cursor: "pointer",
    margin: "0 10px",
  },
  filterContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
    padding: "10px 0",
    borderBottom: "1px solid #ccc",
  },
  link: {
    color: "#0A306E",
    textDecoration: "underline",
    cursor: "pointer",
  },
  filterInput: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "white",
    color: "black",
    flex: "1",
  },
  clearButton: {
    backgroundColor: "#fff",
    color: "#0B2853",
    border: "1px solid #0B2853",
    borderRadius: "5px",
    padding: "5px 10px",
    marginRight: "10px",
    cursor: "pointer",
  },
  searchButton: {
    backgroundColor: "#0A306E",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
    marginRight: "10px",
  },
};

export default ManageEventsPage;
