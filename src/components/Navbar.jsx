import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faPlane, faList } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <Link to="/home" style={styles.navItem}>
        <FontAwesomeIcon icon={faHome} />
        <span style={styles.navText}>Home</span>
      </Link>
      <Link to="/manage-attendees" style={styles.navItem}>
        <FontAwesomeIcon icon={faUser} />
        <span style={styles.navText}>Attendees</span>
      </Link>
      <Link to="/event-details" style={styles.navItem}>
        <FontAwesomeIcon icon={faList} />
        <span style={styles.navText}>Event Types</span>
      </Link>
      <Link to="/event-attendees" style={styles.navItem}>
        <FontAwesomeIcon icon={faPlane} />
        <span style={styles.navText}>Flights</span>
      </Link>
    </nav>
  );
};

export default Navbar;

const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#0A306E',
      color: 'white',
      padding: '10px 0',
    },
    navItem: {
      color: 'white',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
    },
    navText: {
      marginLeft: '8px',
    }
  };  