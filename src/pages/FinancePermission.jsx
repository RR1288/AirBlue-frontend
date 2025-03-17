import React, { useState } from 'react';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const FinancePermission = () => {

    const handleBudgetChange = async  (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`https://airblue-backend-staging-eac124cc32ab.herokuapp.com/events/set-budget`, {

                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                body: JSON.stringify({ eventID, totalBudget, flightBudget })
            });

        } catch (error) {
            console.error(error);
            
        }

    };

  return (
    <div style={styles.container}>
      <Header title="AirBlue System" />
      <main style={styles.main}>
        <section style={styles.content}>
          {/* Back Button */}
          <div style={styles.headerRow}>
            <Link to="/home" style={styles.backButton}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
            <h2 style={styles.title}>Finance Permissions</h2>
          </div>

          {/* Permission Information */}
          <p style={styles.description}>
            Manage access to financial data and transactions. Ensure compliance
            with organizational policies while granting necessary permissions.
          </p>

          {/* Action Buttons */}
          <div style={styles.buttonContainer}>
            <button style={styles.actionButton}>Request Access</button>
            <button style={styles.actionButton}>Approve Request</button>
            <button style={styles.actionButton}>Manage Permissions</button>
          </div>
        </section>
      </main>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#ffffff',
    boxSizing: 'border-box',
  },
  main: {
    flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: '800px',
    marginBottom: '20px',
  },
  backButton: {
    display: 'flex',
    alignItems: 'left',
    textDecoration: 'none',
    color: '#0B2853',
    fontSize: '16px',
    fontWeight: '600',
    marginRight: '20px',
  },
  title: {
    fontSize: '24px',
    color: '#0B2853',
    fontWeight: '600',
  },
  description: {
    fontSize: '16px',
    color: 'black',
    textAlign: 'center',
    maxWidth: '600px',
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
  },
  actionButton: {
    backgroundColor: '#0A306E',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
  },
};

export default FinancePermission;
