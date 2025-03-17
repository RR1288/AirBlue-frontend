// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faUser, faPlane } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './HomePage.module.css';

const HomePage = () => {
    
    return (
        <div className={styles.page}>
            <Header title="AirBlue System" />

            <main className={styles.mainContent}>
                <h2 className={styles.welcomeText}>Welcome back, Nick!</h2>

                <div className={styles.grid}>
                    <Card link="/user-events" icon={faGlobe} title="Events" />
                    <Card link="/event-attendees" icon={faUser} title="Attendees" />
                    <Card link="/flight-search" icon={faPlane} title="Flights" />
                </div>
            </main>

            <Footer />
        </div>
    );
};

// Reusable Card component with prop validation
const Card = ({ link, icon, title }) => (
    <Link to={link} className={styles.card}>
        <FontAwesomeIcon icon={icon} className={styles.icon} />
        <p className={styles.cardTitle}>{title}</p>
    </Link>
);

// PropTypes validation for Card component
Card.propTypes = {
    link: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired, // FontAwesome icons are objects
    title: PropTypes.string.isRequired
};

export default HomePage;

