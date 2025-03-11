import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav style={styles.navbar}>
            <Link to="/" style={styles.link}>Home</Link>
            <Link to="/manage-events" style={styles.link}>Events</Link>
            <Link to="/manage-attendees" style={styles.link}>Attendees</Link>
            <Link to="/event-details" style={styles.link}>Event Types</Link>
            <Link to="/event-attendees" style={styles.link}>Flights</Link>
        </nav>
    );
};

// Styles for the NavBar
const styles = {
    navbar: {
        backgroundColor: '#0B2853',
        padding: '10px 0',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    link: {
        textDecoration: 'none',
        color: 'white',
        fontSize: '16px',
        fontWeight: 'bold'
    }
};

export default NavBar;