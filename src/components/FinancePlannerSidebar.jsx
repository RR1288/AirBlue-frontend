import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faHome, faFileInvoiceDollar, faChartLine } from "@fortawesome/free-solid-svg-icons";

const FinancePlannerSidebar = ({ isOpen, setIsOpen }) => {
    const linkStyle = {
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        color: "white",
        padding: "15px",
        fontSize: "18px",
        transition: "background 0.2s",
    };

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

            <nav>
                <Link to="/home" style={linkStyle} onClick={() => setIsOpen(false)}>
                    <FontAwesomeIcon icon={faHome} style={{ marginRight: "10px" }} /> Home
                </Link>
                <Link to="/finance-permission" style={linkStyle} onClick={() => setIsOpen(false)}>
                    <FontAwesomeIcon icon={faFileInvoiceDollar} style={{ marginRight: "10px" }} /> Finance
                </Link>
                <Link to="/finance-details" style={linkStyle} onClick={() => setIsOpen(false)}>
                    <FontAwesomeIcon icon={faChartLine} style={{ marginRight: "10px" }} /> Financial Event Details
                </Link>
            </nav>
        </div>
    );
};

export default FinancePlannerSidebar;
