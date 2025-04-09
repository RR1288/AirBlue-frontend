import React, { useState } from 'react';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faTrash, faArrowLeft, faAlignJustify } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const AdminPage = () => {
    const [users, setUsers] = useState([
        { id: 1, name: "Alice Johnson", role: "User" },
        { id: 2, name: "Bob Smith", role: "User" },
        { id: 3, name: "Charlie Brown", role: "Admin" },
    ]);

    const availableRoles = ["User", "Event Planner", "Finance", "Admin"];

    const updateUserRole = (id, newRole) => {
        setUsers(users.map(user => user.id === id ? { ...user, role: newRole } : user));
    };

    const removeUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    return (
        <div style={styles.page}>
            <Header title="AirBlue System" />
            <div style={styles.mainContent}>
                <div style={styles.headerRow}>
                    <Link to="/home" style={styles.backButton}>
                        <FontAwesomeIcon icon={faArrowLeft} style={styles.icon} />
                    </Link>
                    <h1 style={styles.title}>Admin Panel</h1>
                </div>
                <p style={styles.description}>
                    Manage users, assign roles, and remove inactive accounts.
                </p>
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
                                        <td style={styles.td}>
                                            <div style={styles.columnWrapper}>
                                                <span style={{ fontWeight: 'bold', color: user.role === "Admin" ? "blue" : user.role === "Finance" ? "green" : "#555" }}>
                                                    {user.role}
                                                </span>
                                            </div>
                                        </td>
                                        <td style={styles.td}>
                                            <div style={styles.columnWrapper}>
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
                                            </div>
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
        backgroundColor: '#FFFFFF',
    },
    mainContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px 20px',
    },
    headerRow: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        width: '100%',
        maxWidth: '900px',
    },
    backButton: {
        textDecoration: 'none',
        color: '#0A306E',
        backgroundColor: '#ffffff',
        padding: '8px 12px',
        borderRadius: '5px',
        fontSize: '16px',
        fontWeight: 'bold',
    },
    icon: {
        fontSize: '18px',
        marginRight: '8px',
    },
    title: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#0B2853',
        textAlign: 'center',
        margin: '10px 0',
    },
    description: {
        fontSize: '16px',
        color: '#333',
        marginBottom: '30px',
        textAlign: 'center',
        maxWidth: '600px',
    },
    tableContainer: {
        width: '100%',
        maxWidth: '900px',
        overflowX: 'auto',
        borderRadius: '8px',
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        borderRadius: '8px',
        overflow: 'hidden',
    },
    th: {
        backgroundColor: '#0A306E',
        color: 'white',
        padding: '12px',
        textAlign: 'left',
        fontSize: '16px',
    },
    td: {
        padding: '12px',
        borderBottom: '1px solid #ddd',
        fontSize: '15px',
        verticalAlign: 'top',
    },
    row: {
        backgroundColor: 'white',
        transition: '0.3s',
    },
    columnWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '8px',
    },
    roleDropdown: {
        padding: '6px 8px',
        borderRadius: '5px',
        border: '1px solid #0A306E',
        backgroundColor: '#FFFFFF',
        color: '#0A306E',
        fontSize: '14px',
        fontWeight: 'bold',
        outline: 'none',
        transition: '0.3s',
        margin: 0,
    },
    removeButton: {
        backgroundColor: '#dc3545',
        color: 'white',
        padding: '6px 12px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        fontSize: '14px',
        margin: 0,
    },
    removeButtonHover: {
        backgroundColor: '#b52b3a',
    },
    placeholderText: {
        textAlign: 'center',
        padding: '15px',
        fontStyle: 'italic',
        color: '#888',
    }
};

export default AdminPage;
