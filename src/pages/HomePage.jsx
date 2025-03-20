// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./HomePage.module.css";
import { roleOptions } from "../config/roleOptions";


const HomePage = () => {
  // State to keep track of the selected role.
  // Default to "attendee" if no roles are found in localStorage.
  const [selectedRole, setSelectedRole] = useState("attendee");

  // On mount, set the default role based on localStorage.
  // For a roles string like "AEF", we default to the first available role.
  useEffect(() => {
    const rolesString = localStorage.getItem("roles") || "";
    if (rolesString !== "") {
      const roleMap = { A: "admin", E: "eventPlanner", F: "financePlanner" };
      const availableRoles = rolesString
        .split("")
        .map((letter) => roleMap[letter])
        .filter(Boolean);
      if (availableRoles.length > 0) {
        setSelectedRole(availableRoles[0]);
      }
    }
  }, []);

  // Callback passed to Header to update the role on change.
  const handleRoleChange = (newRole) => {
    setSelectedRole(newRole);
  };

  return (
    <div className={styles.page}>
      {/* Pass the current role and the change handler to Header */}
      <Header
        title="AirBlue System"
        userRole={selectedRole}
        onRoleChange={handleRoleChange}
      />

      <main className={styles.mainContent}>
        <h2 className={styles.welcomeText}>
          Welcome back! ({selectedRole.charAt(0).toUpperCase() +
            selectedRole.slice(1)})
        </h2>
        <div className={styles.grid}>
          {roleOptions[selectedRole] &&
            roleOptions[selectedRole].map((card, index) => (
              <Card
                key={index}
                link={card.link}
                icon={card.icon}
                title={card.label}
              />
            ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Reusable Card component
const Card = ({ link, icon, title }) => (
  <Link to={link} className={styles.card}>
    <FontAwesomeIcon icon={icon} className={styles.icon} />
    <p className={styles.cardTitle}>{title}</p>
  </Link>
);

Card.propTypes = {
  link: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default HomePage;
