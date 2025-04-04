import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faUserTag } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons/faPhone";

const UserInfoPage = () => {
    const [selectedRole, setSelectedRole] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    const handleRoleChange = (newRole) => {
        setSelectedRole(newRole);
    };

    useEffect(() => {
        // Simulated fetching logic (to be replaced with actual backend API call)
        const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));

        if (storedUserInfo) {
            setUserInfo(storedUserInfo);
        } else {
            // Placeholder user data for front-end development
            setUserInfo({
                firstName: "John",
                lastName: "Doe",
                email: "johndoe@example.com",
                username: "johndoe123",
                phone: "123-456-7890",
                role: "User",
            });
        }
    }, []);

    return (
        <div style={styles.container}>
            <Header
                title="AirBlue System"
                userRole={selectedRole}
                onRoleChange={handleRoleChange}
            />
            <main style={styles.main}>
                <section style={styles.infoSection}>
                    <h1 style={styles.h1}>User Information</h1>
                    {userInfo ? (
                        <div style={styles.infoCard}>
                            <p style={styles.infoItem}>
                                <FontAwesomeIcon icon={faUser} style={styles.icon} />
                                <strong> Full Name:</strong> {userInfo.firstName} {userInfo.lastName}
                            </p>
                            <p style={styles.infoItem}>
                                <FontAwesomeIcon icon={faEnvelope} style={styles.icon} />
                                <strong> Email:</strong> {userInfo.email}
                            </p>
                            <p style={styles.infoItem}>
                                <FontAwesomeIcon icon={faUserTag} style={styles.icon} />
                                <strong> Username:</strong> {userInfo.username}
                            </p>
                            <p style={styles.infoItem}>
                                <FontAwesomeIcon icon={faPhone} style={styles.icon} />
                                <strong> Phone Number:</strong> {userInfo.phone}
                            </p>
                            <p style={styles.infoItem}>
                                <FontAwesomeIcon icon={faUserTag} style={styles.icon} />
                                <strong> Role:</strong> {userInfo.role}
                            </p>
                            <button onClick={() => navigate("/forgot-password")} style={styles.button}>
                                Reset Password
                            </button>
                        </div>
                    ) : (
                        <p style={styles.noInfoMessage}>Loading user information...</p>
                    )}
                </section>
            </main>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#f9f9f9",
        boxSizing: "border-box",
    },
    main: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        marginTop: "20px",
    },
    infoSection: {
        width: "100%",
        maxWidth: "600px",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
    },
    h1: {
        fontSize: "24px",
        color: "#0B2853",
        fontWeight: "600",
        marginBottom: "20px",
    },
    infoCard: {
        textAlign: "center",
    },
    infoItem: {
        fontSize: "16px",
        color: "#333",
        marginBottom: "10px",
        display: "flex",
        alignItems: "center",
    },
    icon: {
        marginRight: "10px",
        color: "#0B2853",
    },
    button: {
        marginTop: "20px",
        padding: "10px 15px",
        backgroundColor: "#0B2853",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
        width: "30%",
        textAlign: "center",
    },
    noInfoMessage: {
        fontSize: "16px",
        color: "#999",
        textAlign: "center",
    },
};

export default UserInfoPage;
