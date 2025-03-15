import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faHome, faPlane, faUser, faInfo, faClock } from "@fortawesome/free-solid-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons/faGlobe";

const UserSidebar = ({ isOpen, setIsOpen }) => {
    return (
        <>
            {/* Sidebar */}
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
        zIndex: 9999, // Ensures it's always above other elements
    }}
>

                {/* Close Button */}
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

                {/* Sidebar Links */}
                <Link to="/home" style={linkStyle} onClick={() => setIsOpen(false)}>
                    <FontAwesomeIcon icon={faHome} /> Home
                </Link>
                <Link to="/user-info" style={linkStyle} onClick={() => setIsOpen(false)}>
                    <FontAwesomeIcon icon={faUser} /> User Info
                </Link>
                <Link to="/flight-search" style={linkStyle} onClick={() => setIsOpen(false)}>
                    <FontAwesomeIcon icon={faPlane} /> Flight Search
                </Link>
                <Link to="/events" style={linkStyle} onClick={() => setIsOpen(false)}>
                    <FontAwesomeIcon icon={faGlobe} /> Events
                </Link>
                {/* Uncomment if Profile page exists */}
                {/* <Link to="/profile" style={linkStyle} onClick={() => setIsOpen(false)}>
                    <FontAwesomeIcon icon={faUser} /> My Profile
                </Link> */}
            </div>
        </>
    );
};

// Sidebar Link Styles
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

export default UserSidebar;
