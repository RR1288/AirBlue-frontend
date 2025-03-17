// Import React for creating components
import React from 'react';
import { Link } from 'react-router-dom';

// FontAwesome icon package (add this to your dependencies if not installed already)
// npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

function Footer(){
    return(
        <footer className='footer'>
            <div className="container">
                <div className='row'>
                    <div className='column'>
                        <h2>AirBlue</h2>
                        <ul className='list'>
                            <li>123-456-7890</li>
                            <li>Rochester, New York</li>
                            <li>1 Lomb Memorial Dr</li>
                        </ul>
                    </div>
                    <div className='column'>
                        <h2>Pages</h2>
                        <ul className='list'>
                            <li>       
                                <Link to="/manage-events" className='pageLinks'>
                                    Events
                                </Link>
                            </li>
                            <li>       
                                <Link to="/manage-events" className='pageLinks'>
                                    Attendees
                                </Link>
                            </li>
                            <li>       
                                <Link to="/manage-events" className='pageLinks'>
                                    Event Types
                                </Link>
                            </li>
                            <li>       
                                <Link to="/manage-events" className='pageLinks'>
                                    Flights
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr />
                <div className='row'>
                    <p className='smallColumn'>
                        &copy;{new Date().getFullYear()} AirBlue | All Rights Reserverd
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
