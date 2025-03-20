// eslint-disable-next-line no-unused-vars
import React, {useState, useMemo} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt, faBars} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import styles from "./Header.module.css";
import Sidebar from "./Sidebar";

function Header({title, userRole, hideSidebar = false, onRoleChange}) {
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
            T: "attendee",
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
        localStorage.removeItem('user'); 
        localStorage.removeItem('roles'); 
    
        // Redirect to the login page
        window.location.href = '/login';  // Or use React Router's history.push('/login')
    };
    return (
        <div className={styles.headerContainer}>
            {/* Sidebar toggle button */}
            <div className={styles.sidebarToggle} onClick={() => setSidebarOpen(!sidebarOpen)}>
                <FontAwesomeIcon icon={faBars} />
            </div>

            {/* Header title */}
            <div className={styles.headerTitle}>
                <h1>{title}</h1>
            </div>

            {/* Role selector */}
            {/* // Only show the dropdown if there are multiple roles or if userRole isn't 'attendee' */}
            <div className={styles.roleSelector}>
                {availableRoles.length > 1 && (
                    <select onChange={handleRoleChange} value={userRole}>
                        {availableRoles.map((role) => (
                            <option key={role} value={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            {/* Logout button */}
            return (
                <div className={styles.logoutButton}>
                    {/* Sign Out Icon */}
                    <FontAwesomeIcon 
                        icon={faSignOutAlt} 
                        onClick={handleSignOut} 
                    />
                </div>
            );
                        {renderSidebar()}
                    </div>
                );
            }

Header.propTypes = {
    title: PropTypes.string.isRequired,
    userRole: PropTypes.string.isRequired,
    hideSidebar: PropTypes.bool, // Added prop validation
};

export default Header;
