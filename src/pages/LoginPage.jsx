// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import PinModal from "../components/PinModal";
import Header from "../components/Header";
import styles from "./LoginPage.module.css";
import { useNotifications } from "../components/NotificationProvider";
import FooterNoLink from "../components/FooterNoLink";
import validator from "validator";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
    const { addNotification } = useNotifications();
    const { login } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [showPinModal, setShowPinModal] = useState(false);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        let { username, password } = credentials;

        username = validator.trim(username);
        password = validator.trim(password);

        // validate username
        if (!validator.isAlphanumeric(username) && !validator.isEmail(username)) {
            addNotification({
                type: "error",
                title: "Invalid Input",
                message: "Username must be an email or contain only letters and numbers.",
            });
            return;
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                }
            );

            const data = await response.json();

            if (!response.ok || !data?.success) {
                throw new Error(
                    data?.message || "Login failed. Please try again."
                );
            }

            console.log(data.data.two_fa_required);
            login({
                token: data.data?.token,
                roles: data.data?.roles,
                userId: data.data.userId,
                username: data.data.username,
            });

            if (!data.data.two_fa_required) {
                navigate("/enable-2fa");
            } else {
                // Set userId and open the PinModal for 2FA
                setUserId(data.data.userId);
                setShowPinModal(true);
            }
        } catch (error) {
            addNotification({
                type: "error",
                title: "Login Failed",
                message: error.message,
            });
        }
    };

    return (
        <div className={styles.page}>
            <Header title="AirBlue System" hideSidebar={true} />
            <div className={styles.mainContent}>
                <h1 className={styles.h1}>Login Page</h1>
                <div className={styles.loginContainer}>
                    <form
                        onSubmit={handleLoginSubmit}
                        className={styles.form}
                    >
                        <div className={styles.formGroup}>
                            <label
                                htmlFor="username"
                                className={styles.label}
                            >
                                Username:
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={credentials.username}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label
                                htmlFor="password"
                                className={styles.label}
                            >
                                Password:
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={credentials.password}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>
                        <button type="submit" className={styles.button}>
                            Log In
                        </button>
                    </form>

                    <div className={styles.forgotPasswordContainer}>
                        <Link
                            to="/forgot-password"
                            className={styles.forgotPasswordLink}
                        >
                            Forgot Password
                        </Link>
                    </div>

                    <div className={styles.registerPrompt}>
                        Don&apos;t have an account?{" "}
                        <Link to="/register" className={styles.registerLink}>
                            Register
                        </Link>
                    </div>
                </div>
            </div>

            <PinModal
                isOpen={showPinModal}
                userId={userId} // Pass the userId to PinModal
                onSubmit={() => setShowPinModal(false)} // Handle successful 2FA
                onClose={() => setShowPinModal(false)}
            />
            <FooterNoLink />
        </div>
    );
};

export default LoginPage;
