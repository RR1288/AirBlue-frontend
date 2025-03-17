import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import AdminSidebar from "./AdminSidebar";
import FinancePlannerSidebar from "./FinancePlannerSidebar";
import EventPlannerSidebar from "./EventPlannerSidebar";
import AttendeeSidebar from "./AttendeeSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faBars } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

function Header({ title, userRole, hideSidebar = false }) { // hideSidebar now strictly controls sidebar rendering
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Function to render the appropriate sidebar based ONLY on hideSidebar prop
    const renderSidebar = () => {
        if (hideSidebar) return null; // Sidebar is completely removed when hideSidebar=true

        switch (userRole) {
            case "admin":
                return <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />;
            case "attendee":
                return <AttendeeSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />;
            case "financePlanner":
                return <FinancePlannerSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />;
            case "eventPlanner":
                return <EventPlannerSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />;
            case "user":
            default:
                return <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />;
        }
    };

    return (
        <>
            {/* Sidebar will now ONLY be affected by hideSidebar */}
            {renderSidebar()}

            <header style={styles.header}>
                {/* Menu button toggles sidebar unless hidden */}
                {!hideSidebar && (
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} style={styles.menuButton}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                )}

                {/* Page title */}
               <a href="home"><h1 style={styles.title}>{title}</h1></a>

                {/* Sign out link with an icon */}
                <Link to="/login" style={styles.signOut}>
                    <FontAwesomeIcon icon={faSignOutAlt} style={styles.signOutIcon} /> Sign Out
                </Link>
            </header>
        </>
    );
}

// PropTypes for validation
Header.propTypes = {
    title: PropTypes.string.isRequired,
    userRole: PropTypes.string.isRequired,
    hideSidebar: PropTypes.bool, // Added prop validation
};

// Styles for the header
const styles = {
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#0A306E",
        color: "white",
        padding: "10px 20px",
    },
    menuButton: {
        background: "none",
        border: "none",
        color: "white",
        fontSize: "20px",
        cursor: "pointer",
    },
    title: {
        margin: 0,
        fontSize: "18px",
        color: "white",
    },
    signOut: {
        display: "flex",
        alignItems: "center",
        color: "white",
        textDecoration: "none",
        padding: "5px 10px",
        borderRadius: "5px",
    },
    signOutIcon: {
        marginRight: "8px",
        fontSize: "16px",
    },
};

export default Header;
``