import React, { useState } from 'react';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faArrowLeft, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const FlightSearchPage = () => {
    const [selectedRole, setSelectedRole] = useState("");
    const [searchQuery, setSearchQuery] = useState('');

    // Default flights
    const flights = [
        { id: 1, destination: "Tirana, Albania", price: "$120", time: "10:30 AM" },
        { id: 2, destination: "Pristina, Kosovo", price: "$90", time: "12:00 PM" },
        { id: 3, destination: "Skopje, North Macedonia", price: "$100", time: "2:45 PM" },
        { id: 4, destination: "Shkodër, Albania", price: "$80", time: "4:00 PM" },
    ];

    const handleRoleChange = (newRole) => {
        setSelectedRole(newRole);
    };

    return (
        <div style={styles.page}>
            {/* _Header_Component_ */}
            <Header
                title="AirBlue System"
                userRole={selectedRole}
                onRoleChange={handleRoleChange}
            />

            <div style={styles.mainContent}>
                {/* _Back_Button_and_Title_ */}
                <div style={styles.headerRow}>
                    <Link to="/home" style={styles.backButton}>
                        <FontAwesomeIcon icon={faArrowLeft} style={styles.icon} />
                    </Link>
                    <h1 style={styles.title}>Flight Search</h1>
                </div>

                <p style={styles.description}>
                    Explore flights! Search for flights or select from popular destinations below.
                </p>

                {/* _Search Bar_ */}
                <div style={styles.searchContainer}>
                    <div style={styles.inputContainer}>
                        <FontAwesomeIcon icon={faSearch} style={styles.icon} />
                        <input
                            type="text"
                            placeholder="Search flights..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <button style={styles.searchButton}>Search</button>
                </div>

                {/* _Flight Cards_ */}
                <div style={styles.flightsContainer}>
                    {flights.map((flight) => (
                        <div key={flight.id} style={styles.card}>
                            <FontAwesomeIcon icon={faPlaneDeparture} style={styles.cardIcon} />
                            <h3 style={styles.cardTitle}>{flight.destination}</h3>
                            <p style={styles.cardText}>Price: {flight.price}</p>
                            <p style={styles.cardText}>Departure: {flight.time}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// _STYLES_OBJECT_
const styles = {
    page: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#FFFFFF',
    },
    mainContent: {
        flex: 1,
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '20px'
    },
    headerRow: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px'
    },
    backButton: {
        textDecoration: 'none',
        color: '#0B2853',
        marginRight: '20px'
    },
    icon: {
        fontSize: '20px',
        marginRight: '10px',
        color: '#0B2853',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#0B2853'
    },
    description: {
        fontSize: '16px',
        color: '#333',
        marginBottom: '20px',
        textAlign: 'center'
    },
    searchContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: '20px'
    },
    inputContainer: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '5px',
        backgroundColor: '#F9F9F9',
        maxWidth: '300px'
    },
    input: {
        flex: 1,
        border: 'none',
        padding: '10px',
        outline: 'none',
        backgroundColor: '#F9F9F9'
    },
    searchButton: {
        backgroundColor: '#0B2853',
        color: 'white',
        marginTop: '0px',
        padding: '10px 15px',
        borderRadius: '4px',
        cursor: 'pointer',
        border: 'none'
    },
    flightsContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '15px',
        marginTop: '40px'
    },
    card: {
        backgroundColor: '#F9F9F9',
        padding: '15px',
        borderRadius: '8px',
        textAlign: 'center',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
        transition: '0.3s',
    },
    cardIcon: {
        fontSize: '24px',
        color: '#0A306E',
        marginBottom: '10px'
    },
    cardTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#0B2853'
    },
    cardText: {
        fontSize: '14px',
        color: '#333'
    }
};

export default FlightSearchPage;
