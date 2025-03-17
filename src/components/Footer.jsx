// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <h2>AirBlue</h2>
                        <ul className={styles.list}>
                            <li>123-456-7890</li>
                            <li>Rochester, New York</li>
                            <li>1 Lomb Memorial Dr</li>
                        </ul>
                    </div>
                    <div className={styles.column}>
                        <h2>Pages</h2>
                        <ul className={styles.list}>
                            <li>
                                <Link to="/events" className={styles.pageLinks}>Events</Link>
                            </li>
                            <li>
                                <Link to="/attendees" className={styles.pageLinks}>Attendees</Link>
                            </li>
                            <li>
                                <Link to="/event-types" className={styles.pageLinks}>Event Types</Link>
                            </li>
                            <li>
                                <Link to="/flights" className={styles.pageLinks}>Flights</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr />
                <div className={styles.row}>
                    <p className={styles.smallColumn}>
                        &copy; {new Date().getFullYear()} AirBlue | All Rights Reserved
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
