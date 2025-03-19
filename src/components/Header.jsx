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
                {/* Render role switcher if more than one role is available */}
                {availableRoles.length > 1 && (
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
                                {role.charAt(0).toUpperCase() + role.slice(1)}
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
    hideSidebar: PropTypes.bool,
    onRoleChange: PropTypes.func,
};

export default Header;
