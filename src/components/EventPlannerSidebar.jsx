import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faHome, faCalendarPlus, faClipboardList, faUserGroup, faPlus, faLocation } from "@fortawesome/free-solid-svg-icons";

const EventPlannerSidebar = ({ isOpen, setIsOpen }) => {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: isOpen ? "0" : "-250px",
                width: "250px",
                height: "100%",
                backgroundColor: "#0B2853",
                color: "white",
                transition: "left 0.3s ease-in-out",
                boxShadow: isOpen ? "2px 0 5px rgba(0, 0, 0, 0.3)" : "none",
                paddingTop: "60px",
                zIndex: 9999,
            }}
        >
            <button
                onClick={() => setIsOpen(false)}
                style={{
                    background: "none",
                    border: "none",
                    color: "white",
                    fontSize: "22px",
                    cursor: "pointer",
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                }}
            >
                <FontAwesomeIcon icon={faTimes} />
            </button>
            <Link to="/home" style={linkStyle} onClick={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={faHome} /> Home
            </Link>
            <Link to="/event-creation" style={linkStyle} onClick={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={faCalendarPlus} /> Create Event
            </Link>
            <Link to="/manage-events" style={linkStyle} onClick={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={faClipboardList} /> Manage Events
            </Link>
            <Link to="/event-attendees" style={linkStyle} onClick={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={faUserGroup} /> Event Attendees
            </Link>
            <Link to="/event-creation" style={linkStyle} onClick={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={faPlus} /> Create Event
            </Link>
            <Link to="/event-details" style={linkStyle} onClick={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={faLocation} /> Event Details
            </Link>

        </div>
    );
};

const linkStyle = {
    padding: "15px",
    textDecoration: "none",
    color: "white",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: "background 0.2s",
};

export default EventPlannerSidebar;
