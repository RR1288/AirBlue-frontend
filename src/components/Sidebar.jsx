// eslint-disable-next-line no-unused-vars
import React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import {faTimes} from "@fortawesome/free-solid-svg-icons";
import styles from "./Sidebar.module.css";
import {sidebarOptions} from "../config/roleOptions";

const Sidebar = ({userRole, isOpen, setIsOpen}) => {
    // Choose the appropriate items based on the current role.
    const items = sidebarOptions[userRole] || sidebarOptions["attendee"];

    return (
        <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
            <button
                onClick={() => setIsOpen(false)}
                className={styles.closeButton}
            >
                <FontAwesomeIcon icon={faTimes} />
            </button>
            <nav className={styles.nav}>
                {items.map((item, index) => (
                    <Link
                        key={index}
                        to={item.link}
                        className={styles.link}
                        onClick={() => setIsOpen(false)}
                    >
                        <FontAwesomeIcon
                            icon={item.icon}
                            className={styles.icon}
                        />
                        {item.label}
                    </Link>
                ))}
            </nav>
        </div>
    );
};
// Prop Validation
Sidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    userRole: PropTypes.oneOf([
        "admin",
        "eventPlanner",
        "financePlanner",
        "attendee",
    ]).isRequired,
};

export default Sidebar;
