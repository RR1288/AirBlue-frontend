import React, { useState } from 'react';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const EventDetailsPage = ({ event = {}, userRole }) => {
    const isFinance = userRole === 'finance'; // Check if current user has Finance role

    // Default values in case event data is missing
    const [totalBudget, setTotalBudget] = useState(event.totalBudget || 0);
    const [perAttendeeBudget, setPerAttendeeBudget] = useState(event.perAttendeeBudget || 0);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFinance) {
            console.log('Submitting budget:', { totalBudget, perAttendeeBudget });
        }
    };

    // Ensure event data is present to avoid errors
    const eventName = event.name || 'Unnamed Event';
    const eventDate = event.date || 'TBD';
    const eventLocation = event.location || 'Location not specified';
    const eventStatus = event.status || 'Pending Approval';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw', backgroundColor: '#F4F7FC', paddingBottom: '50px' }}>
            {/* Header */}
            <Header title="AirBlue System" />

            <div style={{ flex: 1, maxWidth: '75%', minWidth: '600px', margin: '0 auto', marginTop: '40px', padding: '30px', backgroundColor: '#FFFFFF', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
                {/* Back Button & Title */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <Link to="/home" style={{ textDecoration: 'none', color: '#0B2853', marginRight: '15px' }}>
                        <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '20px' }} />
                    </Link>
                    <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0B2853' }}>Event Details</h1>
                </div>

                {/* Event Info */}
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0B2853', marginBottom: '10px' }}>{eventName}</h2>
                <p style={{ fontSize: '18px', color: '#333', marginBottom: '5px' }}>
                    <strong>Date:</strong> {eventDate}
                </p>
                <p style={{ fontSize: '18px', color: '#333', marginBottom: '20px' }}>
                    <strong>Location:</strong> {eventLocation}
                </p>

                {/* Budget Allocation Form */}
                <form onSubmit={handleSubmit}>
                    <h3 style={{ fontSize: '22px', color: '#0B2853', marginTop: '20px', marginBottom: '10px' }}>Budget Allocation</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '10px' }}>
                        {/* Total Budget */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label htmlFor="totalBudget" style={{ fontWeight: 'bold', color: '#0B2853', marginBottom: '5px' }}>Total Event Budget</label>
                            <input
                                type="number"
                                id="totalBudget"
                                value={totalBudget}
                                onChange={(e) => setTotalBudget(e.target.value)}
                                disabled={!isFinance}
                                required
                                min="0"
                                step="0.01"
                                style={{
                                    padding: '12px',
                                    border: '1px solid #0B2853',
                                    borderRadius: '5px',
                                    fontSize: '18px',
                                    backgroundColor: isFinance ? '#F9F9F9' : '#e9ecef',
                                    cursor: isFinance ? 'text' : 'not-allowed',
                                    width: '90%',
                                }}
                            />
                        </div>

                        {/* Per Attendee Budget */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label htmlFor="perAttendeeBudget" style={{ fontWeight: 'bold', color: '#0B2853', marginBottom: '5px' }}>Budget per Attendee</label>
                            <input
                                type="number"
                                id="perAttendeeBudget"
                                value={perAttendeeBudget}
                                onChange={(e) => setPerAttendeeBudget(e.target.value)}
                                disabled={!isFinance}
                                required
                                min="0"
                                step="0.01"
                                style={{
                                    padding: '12px',
                                    border: '1px solid #0B2853',
                                    borderRadius: '5px',
                                    fontSize: '18px',
                                    backgroundColor: isFinance ? '#F9F9F9' : '#e9ecef',
                                    cursor: isFinance ? 'text' : 'not-allowed',
                                    width: '90%',
                                }}
                            />
                        </div>
                    </div>

                    {/* Approval Status */}
                    <div style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                        <strong>Status: </strong>
                        <span style={{
                            display: 'inline-block',
                            padding: '8px 14px',
                            borderRadius: '5px',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            backgroundColor: eventStatus === 'Approved' ? '#28A745' : eventStatus === 'Rejected' ? '#DC3545' : '#FFC107',
                            color: eventStatus === 'Pending Approval' ? '#333' : 'white',
                        }}>
                            {eventStatus}
                        </span>
                    </div>

                    {/* Submit Button (only for Finance users) */}
                    {isFinance && (
                        <button type="submit"
                            style={{
                                marginTop: '20px',
                                padding: '12px 24px',
                                border: 'none',
                                borderRadius: '5px',
                                fontSize: '18px',
                                cursor: 'pointer',
                                backgroundColor: '#0B2853',
                                color: 'white',
                                transition: '0.3s',
                                width: '100%',
                                fontWeight: 'bold',
                            }}>
                            {eventStatus === 'Pending Approval' ? 'Submit for Approval' : 'Save Budget'}
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default EventDetailsPage;
