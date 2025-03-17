import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faHome, faCalendarAlt, faUser } from "@fortawesome/free-solid-svg-icons";

const AttendeeSidebar = ({ isOpen, setIsOpen }) => {
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

            {/* Home Page Link */}
            <Link to="/home" style={linkStyle} onClick={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={faHome} /> Home
            </Link>

            {/* My Events Page Link */}
            <Link to="/my-events" style={linkStyle} onClick={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={faCalendarAlt} /> My Events
            </Link>

            {/* User Info Page Link */}
            <Link to="/user-info" style={linkStyle} onClick={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={faUser} /> My Profile
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

export default AttendeeSidebar;
