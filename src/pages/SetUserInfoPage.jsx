import React, { useState } from 'react';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#f4f7fc',
    boxSizing: 'border-box',
  },
  contentWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '50px 20px',
    transition: 'margin-left 0.3s ease-in-out',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '450px',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  backButton: {
    textDecoration: 'none',
    color: '#0B2853',
    fontSize: '20px',
    marginRight: '15px',
  },
  title: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#0B2853',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    color: '#333',
    fontSize: '14px',
    fontWeight: '600',
  },
  input: {
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#F9F9F9',
    color: '#333',
    fontSize: '16px',
    outline: 'none',
    transition: 'border 0.3s ease',
  },
  inputFocus: {
    border: '1px solid #0A306E',
  },
  saveButton: {
    backgroundColor: '#0A306E',
    color: 'white',
    padding: '12px',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '20px',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    transition: 'background 0.3s ease',
  },
  saveButtonHover: {
    backgroundColor: '#082A5A',
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
      <Sidebar roles={[]} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        <Header title="AirBlue System" setSidebarOpen={setSidebarOpen} />
        <div style={styles.contentWrapper}>
          <div style={styles.card}>
            {/* Back Button */}
            <div style={styles.headerRow}>
              <Link to="/register" style={styles.backButton}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </Link>
              <h2 style={styles.title}>User Info</h2>
            </div>

            {/* User Info Form */}
            <form>
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
              <button
                type="submit"
                style={styles.saveButton}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.saveButtonHover.backgroundColor)}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.saveButton.backgroundColor)}
              >
                <FontAwesomeIcon icon={faSave} /> Save Info
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoPage;