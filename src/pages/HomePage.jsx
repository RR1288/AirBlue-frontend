// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./HomePage.module.css";
import { roleOptions } from "../config/roleOptions";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
    const { selectedRole } = useContext(AuthContext); // Get selectedRole directly from AuthContext

    // Friendly display for the current role
    const displayRoleName =
        selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1);

    return (
        <div className={styles.page}>
            {/* Header automatically receives selectedRole from AuthContext */}
            <Header title="AirBlue System" />

            <main className={styles.mainContent}>
                <h2 className={styles.welcomeText}>
                    Welcome back! ({displayRoleName})
                </h2>

                {/* Dynamically render cards based on selectedRole */}
                <div className={styles.grid}>
                    {roleOptions[selectedRole]?.map((card, index) => (
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