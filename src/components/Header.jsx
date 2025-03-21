// eslint-disable-next-line no-unused-vars
import React, {useState, useMemo} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt, faBars} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import styles from "./Header.module.css";
import Sidebar from "./Sidebar";
import {Link} from "react-router-dom";

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
        localStorage.removeItem("user");
        localStorage.removeItem("roles");

        // Redirect to the login page
        window.location.href = "/login"; // Or use React Router's history.push('/login')
    };

    return (
        <>
          {/* Render Sidebar component... */}
          <header className={styles.header}>
            {/* Conditionally render the menu button... */}
            {!hideSidebar && (
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={styles.menuButton}
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            )}
            {/* Link to home page with title... */}
            <a href="/home">
              <h1 className={styles.title}>{title}</h1>
            </a>
            {/* Conditionally render role switcher based on availableRoles and localStorage... */}
            {availableRoles.length > 1 && (
              <select
                value={userRole}
                onChange={handleRoleChange}
                className={styles.roleSwitcher}
              >
                {availableRoles.map((role) => (
                  <option key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
              </select>
            )}
            {/* Link to login page with sign-out functionality... */}
            <Link to="/login" className={styles.signOut} onClick={handleSignOut}>
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
    hideSidebar: PropTypes.bool, // Added prop validation
    onRoleChange: PropTypes.func.isRequired,
};

export default Header;
