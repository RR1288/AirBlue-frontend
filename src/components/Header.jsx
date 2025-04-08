// eslint-disable-next-line no-unused-vars
import React, {useState, useContext, useMemo} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt, faBars} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import styles from "./Header.module.css";
import Sidebar from "./Sidebar";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { roleOptions } from "../config/roleOptions";


function Header({title, hideSidebar = false }) {
    const location = useLocation();
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);


    // Access roles and functions from AuthContext
    const { selectedRole, roles, setSelectedRole } = useContext(AuthContext);
    
    const availableRoles = useMemo(() => {
        // `roles` string from AuthContext (e.g., "AEF")
        const roleMap = {
            A: "admin",
            E: "eventPlanner",
            F: "financePlanner",
            attendee: "attendee",
        };
    
        // Map codes from the roles string to readable role names
        return roles.split("").map((code) => roleMap[code]).filter(Boolean);
    }, [roles]);
    


    const handleRoleChange = (e) => {
        const newRole = e.target.value;
        setSelectedRole(newRole); // Update the selected role in AuthContext
    
        // Determine allowed pages for the selected role using roleOptions
        const allowedPages = roleOptions[newRole]?.map((option) => option.link) || [];
        if (!allowedPages.includes(location.pathname)) {
            navigate("/home"); // Redirect to home if the current page is not allowed
        }
    };
    


    // Render the appropriate sidebar based on the current userRole.
    const renderSidebar = () => {
        if (hideSidebar) return null;
        return (
            <Sidebar
                userRole={selectedRole}
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
            />
        );
    };

    // Handle the sign-out process
    const handleSignOut = () => {
        logout();
        navigate("/login"); // Redirect to the login page
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
                            value={selectedRole}
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
    hideSidebar: PropTypes.bool, // Added prop validation
};

export default Header;
