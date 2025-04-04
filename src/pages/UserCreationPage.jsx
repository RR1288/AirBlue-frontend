import React, { useState } from 'react';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const UserCreationPage = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [password, setPass] = useState('');
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleChange = (newRole) => {
    setSelectedRole(newRole);
  };


  const handleBudgetChange = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://airblue-backend-staging-eac124cc32ab.herokuapp.com/users/create-end-user`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ fname, lname, email, country, city, state, password })
      });

    } catch (error) {
      console.error(error);

    }

  };

  return (
    <div style={styles.page}>
      {/* Header Component */}
      <Header
        title="AirBlue System"
        userRole={selectedRole}
        onRoleChange={handleRoleChange}
      />

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>


      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Back Button and Title */}
        <div style={styles.headerRow}>
          <Link to="/home" style={styles.backButton}>
            <FontAwesomeIcon icon={faArrowLeft} style={styles.icon} />
          </Link>
          <h1 style={styles.pageTitle}>Create Users</h1>
        </div>
        {/*User Info Input*/}
        <div style={styles.userContainer}>
          <input
            type="text"
            placeholder="First name"
            style={styles.userInput}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last name"
            style={styles.userInput}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            style={styles.userInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Country"
            style={styles.userInput}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            style={styles.userInput}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="State"
            style={styles.userInput}
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            style={styles.userInput}
            value={password}
            onChange={(e) => setPass(e.target.value)}
          />
          <button style={styles.submitButton}>Create User</button>
        </div>

      </div>

    </div>
  );
};

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
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    marginTop: '200px',
  },
  backButton: {
    textDecoration: 'none',
    color: '#0B2853',
    fontSize: '16px',
    fontWeight: '600',
    marginRight: '20px',
  },
  icon: {
    fontSize: '16px',
    color: '#0B2853',
    cursor: 'pointer',
  },
  pageTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#0B2853',
  },
  userContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  userInput: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: 'white',
    color: 'black',
    flex: '1',
  },
  submitButton: {
    backgroundColor: '#0A306E',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },

};