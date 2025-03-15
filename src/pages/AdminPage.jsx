import React, { useState } from 'react';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faTrash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const AdminPage = () => {
    // sample user data
    const [users, setUsers] = useState([
        { id: 1, name: "Alice Johnson", role: "User" },
        { id: 2, name: "Bob Smith", role: "User" },
        { id: 3, name: "Charlie Brown", role: "Admin" },
    ]);

    const availableRoles = ["User", "Event Planner", "Finance", "Admin"];

    // function to update user role
    const updateUserRole = (id, newRole) => {
        setUsers(users.map(user => user.id === id ? { ...user, role: newRole } : user));
    };

    // function to remove a user
    const removeUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
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
                    <h1 style={styles.title}>Admin Panel</h1>
                </div>

                <p style={styles.description}>
                    Manage users, assign roles, and remove inactive accounts.
                </p>

                {/* users Table */}
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>User</th>
                                <th style={styles.th}>Role</th>
                                <th style={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user.id} style={styles.row}>
                                        <td style={styles.td}>{user.name}</td>
                                        <td style={{ ...styles.td, fontWeight: 'bold', color: user.role === "Admin" ? "blue" : user.role === "Finance" ? "green" : "#555" }}>
                                            {user.role}
                                        </td>
                                        <td style={styles.td}>
                                            {user.role !== "Admin" && (
                                                <select
                                                    style={styles.roleDropdown}
                                                    value={user.role}
                                                    onChange={(e) => updateUserRole(user.id, e.target.value)}
                                                >
                                                    {availableRoles.map((role) => (
                                                        <option key={role} value={role}>{role}</option>
                                                    ))}
                                                </select>
                                            )}
                                            <button style={styles.removeButton} onClick={() => removeUser(user.id)}>
                                                <FontAwesomeIcon icon={faTrash} /> Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" style={styles.placeholderText}>
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
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
        backgroundColor: '#FFFFFF'
    },
    mainContent: {
        flex: 1,
        maxWidth: '800px',
        margin: '0 auto',
        marginTop: '150px',
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
    roleDropdown: {
        padding: '8px',
        borderRadius: '3px',
        border: '1px solid #0B2853',  // AirBlue primary color border
        cursor: 'pointer',
        marginRight: '10px',
        backgroundColor: '#FFFFFF',  // White background
        color: '#0B2853',  // AirBlue text color
        fontSize: '14px',
        fontWeight: 'bold',
        outline: 'none',
        transition: '0.3s',
        appearance: 'none',  // Removes default browser styling
        width: '80px',
        textAlign: 'center',
        marginBottom: '10px',
    },

    removeButton: {
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
    placeholderText: {
        textAlign: 'center',
        padding: '15px',
        fontStyle: 'italic',
        color: '#888',
    }
};

export default AdminPage;
