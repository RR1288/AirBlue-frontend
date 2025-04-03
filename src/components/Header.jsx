// eslint-disable-next-line no-unused-vars
import React, {useState, useMemo} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt, faBars} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import styles from "./Header.module.css";
import Sidebar from "./Sidebar";
import {Link, useLocation} from "react-router-dom";
import { AuthContext } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

function Header({title, userRole, hideSidebar = false, onRoleChange}) {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Retrieve and map roles from localStorage.
    // If no roles are found, assume the user is an attendee.
    const availableRoles = useMemo(() => {
        const stored = localStorage.getItem("roles") || "";
        if (stored === "") {
            return ["attendee"];
        }
        const roleMap = {
            A: "admin",
            E: "eventPlanner",
            F: "financePlanner",
        };
        return stored
            .split("")
            .map((letter) => roleMap[letter])
            .filter(Boolean);
    }, []);

    // Handle role switcher changes.
    const handleRoleChange = (e) => {
        const newRole = e.target.value;
        if (onRoleChange) {
            onRoleChange(newRole);
        }
    };
    // Render the appropriate sidebar based on the current userRole.
    const renderSidebar = () => {
        if (hideSidebar) return null;
        return (
            <Sidebar
                userRole={userRole}
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
            />
        );
    };

    // Handle the sign-out process
    const handleSignOut = () => {
        // Clear localStorage or session data
        localStorage.removeItem("user");
        localStorage.removeItem("roles");

        // Redirect to the login page
        window.location.href = "/login";
    };

    return (
        <>
            {renderSidebar()}
            <header className={styles.header}>
                {!hideSidebar && (
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className={styles.menuButton}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                )}
                <a href="/home">
                    <h1 className={styles.title}>{title}</h1>
                </a>
                {/* Render role switcher if more than one role is available and remove switcher from unneccessary pages*/}
                {availableRoles.length > 1 &&
                    location.pathname !== "/" &&
                    location.pathname !== "/login" &&
                    location.pathname !== "/enable-2fa" &&
                    location.pathname !== "/attendee-register" && (
                        <select
                            value={userRole}
                            onChange={handleRoleChange}
                            className={styles.roleSwitcher}
                        >
                            {availableRoles.map((role) => (
                                <option
                                    key={role}
                                    value={role}
                                >
                                    {role.charAt(0).toUpperCase() +
                                        role.slice(1)}
                                </option>
                            ))}
                        </select>
                    )}
                <Link
                    to="/login"
                    className={styles.signOut}
                >
                    <FontAwesomeIcon
                        icon={faSignOutAlt}
                        className={styles.signOutIcon}
                        onClick={handleSignOut}
                    />{" "}
                    Sign Out
                </Link>
            </header>
        </>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    userRole: PropTypes.string.isRequired,
    hideSidebar: PropTypes.bool, // Added prop validation
    onRoleChange: PropTypes.func.isRequired,
};

export default Header;
