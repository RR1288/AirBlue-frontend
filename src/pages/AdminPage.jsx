import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faTrash, faArrowLeft, faAlignJustify } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import {getData} from '../utils/getData';
import { useNotifications } from '../components/NotificationProvider';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminPage = () => {
    const {addNotification } = useNotifications();
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const { token, username } = useAuth();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            console.log(token);
            const res = await getData("GET", "/organizations/getOrganizationUsers", token);
            if (!res.ok) throw new Error("Failed to fetch users");
            const data = await res.json();
            console.log(data.data);
            const users = data.data
            console.log(users);
            setUsers(users);
            console.log(users);
        } catch (error) {
            addNotification({
                titel: "Error",
                message: error.message,
                type: "error",
            });
        }
    }

    const availableRoles = ["User", "Event Planner", "Finance", "Admin"];

    // function to update user role
    const updateUserRole = (id, newRole) => {
        setUsers(users.map(user => user.id === id ? { ...user, role: newRole } : user));
    };

    // function to remove a user
    const removeUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const HandleResetPassword = async () => {
        try {
            const response = await getData("GET", `/users/reset-password-admin`);
            if (!response.ok) throw new Error("Failed to reset password");
            const res = await response.json();
            setPassword({
                user: res.data.userID,
                password: res.data.password,
            });
          } catch (error) {
            addNotification({
              title: "Error",
              message: error.message,
              type: "error",
            });
          }
    }

    const changeOrgPermissions = async () => {
        try {
            const response = await getData("GET", `/organizations/`/**changePermission?*/);
            if (!response.ok) throw new Error("Failed to change organization user permissions");
            const res = await response.json();
           /*
            
           * */
          } catch (error) {
            addNotification({
              title: "Error",
              message: error.message,
              type: "error",
            });
          }
    }

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
                <button onClick={() => navigate("/org-register")}>New user</button>
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
                                        <td style={styles.td}>{user.Name}</td>
                                        <td style={{ ...styles.td, fontWeight: 'bold', color: user.role === "Admin" ? "blue" : user.role === "Finance" ? "green" : "#555" }}>
                                            {user.roles}
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
}


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
        width: '90%',
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
        textAlign: 'center',
        fontSize: '16px',
    },
    td: {
        padding: '12px',
        borderBottom: '1px solid #ddd',
        fontSize: '15px',
        color: 'black',
    },
    row: {
        backgroundColor: 'white',
        transition: '0.3s',
    },
    roleDropdown: {
        padding: '8px',
        borderRadius: '5px',
        border: '1px solid #0A306E',
        cursor: 'pointer',
        backgroundColor: '#FFFFFF',
        color: '#0A306E',
        fontSize: '15px',
        fontWeight: 'bold',
        outline: 'none',
        transition: '0.3s',
        width: '120px',
        textAlign: 'center',
    },
    removeButton: {
        backgroundColor: '#dc3545',
        color: 'white',
        padding: '8px 15px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        fontSize: '14px',
        transition: '0.2s ease-in-out',
    },
    removeButtonHover: {
        backgroundColor: '#b52b3a',
    },
    placeholderText: {
        textAlign: 'center',
        padding: '15px',
        fontStyle: 'italic',
        color: '#888',
    },
};


export default AdminPage;
