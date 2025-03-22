// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

function FooterNoLink() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <h2 className={styles.footerTitle}>AirBlue</h2>
                        <ul className={styles.list}>
                            <li>123-456-7890</li>
                            <li>Rochester, New York</li>
                            <li>1 Lomb Memorial Dr</li>
                        </ul>
                    </div>
                    {/* <div className={styles.column}>
                        <h2 className={styles.footerTitle}>Pages</h2>
                        <ul className={styles.list}>
                            <li>
                                <Link to="/my-events" className={styles.pageLinks}>My Events</Link>
                            </li>
                            <li>
                                <Link to="/user-info" className={styles.pageLinks}>My Info</Link>
                            </li>
                            <li>
                                <Link to="/flight-search" className={styles.pageLinks}>Flights</Link>
                            </li>
                        </ul>
                    </div> */}
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

export default FooterNoLink;
