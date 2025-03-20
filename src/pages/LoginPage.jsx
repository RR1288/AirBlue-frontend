// eslint-disable-next-line no-unused-vars
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import PinModal from "../components/PinModal";
import Header from "../components/Header";
import styles from "./LoginPage.module.css";
import {useNotifications} from "../components/NotificationProvider";
import Footer from "../components/Footer";

const LoginPage = () => {
    const {addNotification} = useNotifications();

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [showPinModal, setShowPinModal] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        const {username, password} = credentials;

        if (!username.trim() || !password.trim()) {
            addNotification({
                type: "error",
                title: "Login Failed",
                message: "Username and password are required",
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
                    body: JSON.stringify({username, password}),
                }
            );

            const data = await response.json();

            if (!response.ok || !data?.success) {
                throw new Error(
                    data?.message || "Login failed. Please try again."
                );
            }
            console.log(data);
            
            if (data.data?.token) {
                localStorage.setItem("token", data.data.token);
                localStorage.setItem("username", data.data.username);
                localStorage.setItem("roles", data.data.roles);
                localStorage.setItem("userId", data.data.userId);

                navigate("/enable-2fa");
            } else if (data?.data?.two_fa_required) {
                localStorage.setItem("username", data.data.username);
                localStorage.setItem("roles", data.data.roles);
                localStorage.setItem("userId", data.data.userId);
                addNotification({
                    type: "info",
                    title: "Two-Factor Authentication",
                    message: "Please enter the PIN sent to your email.",
                });
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

    const handlePinSubmit = async (pin) => {
        const userId = localStorage.getItem("userId");
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/auth/2fa/verify`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        userId,
                        twoFactorCode: pin,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok || !data?.success) {
                throw new Error(data?.message || "PIN verification failed.");
            }

            localStorage.setItem("token", data.data.token);
            addNotification({
                type: "success",
                title: "Success!",
                message: "Verification Successful! Redirecting...",
            });

            setTimeout(() => navigate("/home"), 1000);
            setShowPinModal(false);
        } catch (error) {
            addNotification({
                type: "error",
                title: "PIN Verification Failed",
                message: error.message,
            });
        }
    };

    return (
        <div className={styles.page}>
            <Header
                title="AirBlue System"
                hideSidebar={true}
            />
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
                        <button
                            type="submit"
                            className={styles.button}
                        >
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
                        <Link
                            to="/register"
                            className={styles.registerLink}
                        >
                            Register
                        </Link>
                    </div>

                    <button
                        onClick={() => navigate("/attendee-register")}
                        className={styles.buttonSecondary}
                    >
                        Register as Attendee
                    </button>
                </div>
            </div>

            <PinModal
                isOpen={showPinModal}
                onSubmit={handlePinSubmit}
                onClose={() => setShowPinModal(false)}
            />
            <Footer/>
        </div>
    );
};

export default LoginPage;
