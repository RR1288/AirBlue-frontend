import React, { useState } from 'react';
import Header from '../components/Header';
import UserSidebar from '../components/UserSidebar'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const styles = {
  page: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    overflowX: 'hidden', // Prevents content from shifting
  },
  contentWrapper: {
    flex: 1, 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1080px',
    transition: 'margin-left 0.3s ease-in-out',
    marginTop: '-900px',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  backButton: {
    textDecoration: 'none',
    color: '#0B2853',
    marginRight: '15px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#0B2853',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
    maxWidth: '800px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    color: '#0B2853',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: '#F9F9F9',
    color: 'gray',
  },
  saveButton: {
    backgroundColor: '#0A306E',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '20px',
  },
};

const UserInfoPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
  });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <UserSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        <Header title="AirBlue System" setSidebarOpen={setSidebarOpen} />
        <div style={styles.contentWrapper}>
          {/* Back Button */}
          <div style={styles.headerRow}>
            <Link to="/register" style={styles.backButton}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
            <h2 style={styles.title}>User Info</h2>
          </div>

          {/* User Info Form */}
          <form style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={userInfo.firstName}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={userInfo.lastName}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Phone Number:</label>
              <input
                type="tel"
                name="phone"
                value={userInfo.phone}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email:</label>
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Address:</label>
              <input
                type="text"
                name="address"
                value={userInfo.address}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            {/* Save Button */}
            <button type="submit" style={styles.saveButton}>
              <FontAwesomeIcon icon={faSave} /> Save Info
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserInfoPage;
