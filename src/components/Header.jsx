// Import React for creating components
import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserSidebar from "./UserSidebar"; // Import Sidebar Component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faBars } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

function Header({ title }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            {/* Sidebar Component (Controlled by State) */}
            <UserSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <header style={styles.header}>
                {/* Menu button toggles sidebar */}
                <button onClick={() => setSidebarOpen(!sidebarOpen)} style={styles.menuButton}>
                    <FontAwesomeIcon icon={faBars} />
                </button>

                {/* Page title */}
                <h1 style={styles.title}>{title}</h1>

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
