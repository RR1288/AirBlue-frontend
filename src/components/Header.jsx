// eslint-disable-next-line no-unused-vars
import React, { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faBars } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import styles from "./Header.module.css";
import Sidebar from "./Sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useNotifications } from "./NotificationProvider"; // assuming you have notifications

function Header({ title, userRole, hideSidebar = false, onRoleChange }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { addNotification } = useNotifications();

    const token = localStorage.getItem("token");
    const isLoggedIn = !!token;

    const [sidebarOpen, setSidebarOpen] = useState(false);

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

    const handleRoleChange = (e) => {
        const newRole = e.target.value;
        if (!isLoggedIn) {
            addNotification({
                type: "error",
                title: "Access Denied",
                message: "Please log in to switch roles.",
            });
            return;
        }
        if (onRoleChange) {
            onRoleChange(newRole);
        }
    };

    const handleSignOut = (e) => {
        if (!isLoggedIn) {
            e.preventDefault();
            addNotification({
                type: "error",
                title: "Access Denied",
                message: "You are not logged in.",
            });
            return;
        }

        // Clear localStorage or session data
        localStorage.removeItem("user");
        localStorage.removeItem("roles");
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");

        // Redirect to the login page
        window.location.href = "/login";
    };

    const handleSidebarToggle = () => {
        if (!isLoggedIn) {
            addNotification({
                type: "error",
                title: "Access Denied",
                message: "Please log in to access the menu.",
            });
            return;
        }
        setSidebarOpen(!sidebarOpen);
    };

    const handleTitleClick = (e) => {
        if (!isLoggedIn) {
            e.preventDefault();
            addNotification({
                type: "error",
                title: "Access Denied",
                message: "Please log in to access the home page.",
            });
            return;
        }
        navigate("/home");
    };

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
                        onClick={handleSidebarToggle}
                        className={styles.menuButton}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                )}
                <a
                    href="/home"
                    onClick={handleTitleClick}
                >
                    <h1 className={styles.title}>{title}</h1>
                </a>

                {availableRoles.length > 1 &&
                    location.pathname !== "/" &&
                    location.pathname !== "/login" &&
                    location.pathname !== "/enable-2fa" &&
                    location.pathname !== "/attendee-register" && (
                        <select
                            value={userRole}
                            onChange={handleRoleChange}
                            className={styles.roleSwitcher}
                            disabled={!isLoggedIn} // Prevent role switching if not logged in
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
                    onClick={handleSignOut}
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
    onRoleChange: PropTypes.func.isRequired,
};

export default Header;
