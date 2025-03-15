import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faHome, faCalendarAlt, faUsers, faUserShield, faFileInvoiceDollar, faQuestion } from "@fortawesome/free-solid-svg-icons";

const AdminSidebar = ({ isOpen, setIsOpen }) => {
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
            <Link to="/admin" style={linkStyle} onClick={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={faUserShield} /> Administration
            </Link>
            <Link to="/approval" style={linkStyle} onClick={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={faQuestion} /> Approval Requests
            </Link>


            
        </div>
    );
};

const linkStyle = {
    padding: "15px", // add approval page to links
    textDecoration: "none",
    color: "white",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: "background 0.2s",
};

export default AdminSidebar;
