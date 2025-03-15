import React, { useState } from 'react';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ApprovalPage = () => {
    // sample approval data
    const [approvals, setApprovals] = useState([
        { id: 1, request: "Flight Request - Tirana to Pristina", status: "Pending" },
        { id: 2, request: "Event Budget Approval - Business Summit", status: "Pending" },
        { id: 3, request: "User Registration - John Doe", status: "Pending" },
    ]);

    // function to handle approval
    const handleApproval = (id, action) => {
        setApprovals(approvals.map(item =>
            item.id === id ? { ...item, status: action } : item
        ));
    };

    return (
        <div style={styles.page}>
            {/* header */}
            <Header title="AirBlue System" />

            <div style={styles.mainContent}>
                {/* back Button & Title */}
                <div style={styles.headerRow}>
                    <Link to="/home" style={styles.backButton}>
                        <FontAwesomeIcon icon={faArrowLeft} style={styles.icon} />
                    </Link>
                    <h1 style={styles.title}>Approval Requests</h1>
                </div>

                <p style={styles.description}>
                    Review and manage pending approvals for flights, events, and user registrations.
                </p>

                {/* approvals Table */}
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Request</th>
                                <th style={styles.th}>Status</th>
                                <th style={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {approvals.map((item) => (
                                <tr key={item.id} style={styles.row}>
                                    <td style={styles.td}>{item.request}</td>
                                    <td style={{ ...styles.td, fontWeight: 'bold', color: item.status === "Approved" ? "green" : item.status === "Rejected" ? "red" : "#555" }}>
                                        {item.status}
                                    </td>
                                    <td style={styles.td}>
                                        <button style={styles.approveButton} onClick={() => handleApproval(item.id, "Approved")}>
                                            <FontAwesomeIcon icon={faCheckCircle} /> Approve
                                        </button>
                                        <button style={styles.rejectButton} onClick={() => handleApproval(item.id, "Rejected")}>
                                            <FontAwesomeIcon icon={faTimesCircle} /> Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
        backgroundColor: '#FFFFFF'
    },
    mainContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
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
        marginRight: '10px'
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
    tableContainer: {
        width: '100%',
        overflowX: 'auto',
        marginTop: '20px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#F9F9F9',
        borderRadius: '8px',
        overflow: 'hidden',
    },
    th: {
        backgroundColor: '#0B2853',
        color: 'white',
        padding: '10px',
        textAlign: 'left',
    },
    td: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
    },
    row: {
        backgroundColor: 'white',
        transition: '0.3s',
    },
    approveButton: {
        backgroundColor: '#28a745',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        marginRight: '5px',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        marginBottom: '10px',
    },
    rejectButton: {
        backgroundColor: '#dc3545',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
    },
};


export default ApprovalPage;
