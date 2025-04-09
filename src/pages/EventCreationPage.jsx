// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./EventCreationPage.module.css";
import { getData } from "../utils/getData";
import { useNotifications } from "../components/NotificationProvider";
import { useAuth } from "../context/AuthContext";

const EventCreationPage = () => {
    const { token } = useAuth();
    const { addNotification } = useNotifications();
    const [formData, setFormData] = useState({
        title: "",
        startDate: "",
        endDate: "",
        eventType: "",
        location: "",
        attendeeLimit: "",
        description: "",
    });

    const navigate = useNavigate();

    const sanitizeInput = (value) => {
        return value.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const start = new Date(formData.startDate).toISOString();
        const end = new Date(formData.endDate).toISOString();

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Remove time

        // basic validations
        if (!formData.title || !formData.location || !formData.description) {
            addNotification({
                type: 'warning',
                title: 'Event Creation Failed',
                message: "Please fill out all required fields.",
            });
            return;
        }

        if (start < today) {
            addNotification({
                type: 'warning',
                title: 'Event Creation Failed',
                message: "Start date must be in the future.",
            });
            return;
        }

        if (start > end) {
            addNotification({
                type: 'error',
                title: 'Event Creation Failed',
                message: "Start date must be before the end date.",
            });
            return;
        }

        const attendeeLimit = parseInt(formData.attendeeLimit);
        if (isNaN(attendeeLimit) || attendeeLimit <= 0) {
            addNotification({
                type: 'error',
                title: 'Event Creation Failed',
                message: "Attendee limit must be a positive number.",
            });
            return;
        }

        // sanitize inputs
        const sanitizedTitle = sanitizeInput(formData.title);
        const sanitizedLocation = sanitizeInput(formData.location);
        const sanitizedDescription = sanitizeInput(formData.description);

        const formattedStartDate = start.toISOString().split("T")[0];
        const formattedEndDate = end.toISOString().split("T")[0];

        const body = {
            name: sanitizedTitle,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            typeID: 1,
            description: sanitizedDescription,
            location: sanitizedLocation,
            maxAttendees: attendeeLimit,
        };

        try {
            const response = await getData("POST", "/events/create-event", token, body);
            if (response.ok) {
                const data = await response.json();
                addNotification({
                    type: 'success',
                    title: 'Event successfully created!',
                    message: data.message,
                });
                navigate("/manage-events");
            } else {
                addNotification({
                    type: 'error',
                    title: 'Event Creation Failed',
                    message: "Event creation failed. Please try again.",
                });
            }
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };

    return (
        <div className={styles.page}>
            <Header title="AirBlue System" />
            <div className={styles.mainContent}>
                <div className={styles.headerRow}>
                    <Link to="/manage-events" className={styles.backButton}>
                        <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
                    </Link>
                    <h1 className={styles.eventTitle}>Create New Event</h1>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <label className={styles.label}>Event Title:</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter event title"
                            className={styles.input}
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.row}>
                        <label className={styles.label}>Start Date and Time:</label>
                        <input
                            type="datetime-local"
                            name="startDate"
                            className={styles.input}
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.row}>
                        <label className={styles.label}>End Date and Time:</label>
                        <input
                            type="datetime-local"
                            name="endDate"
                            className={styles.input}
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.row}>
                        <label className={styles.label}>Event Type:</label>
                        <select
                            name="eventType"
                            className={styles.input}
                            value={formData.eventType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Event Type</option>
                            <option value="Board Meeting">Board Meeting</option>
                            <option value="Conference">Conference</option>
                            <option value="Workshop">Workshop</option>
                        </select>
                    </div>
                    <div className={styles.row}>
                        <label className={styles.label}>Location:</label>
                        <input
                            type="text"
                            name="location"
                            placeholder="Enter location"
                            className={styles.input}
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.row}>
                        <label className={styles.label}>Max Attendees:</label>
                        <input
                            type="number"
                            min="1"
                            name="attendeeLimit"
                            placeholder="Enter attendee limit"
                            className={styles.input}
                            value={formData.attendeeLimit}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.row}>
                        <label className={styles.label}>Event Description:</label>
                        <textarea
                            name="description"
                            placeholder="Provide a brief description"
                            className={styles.textarea}
                            value={formData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div className={styles.buttonRow}>
                        <button type="submit" className={styles.createButton}>
                            Create Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventCreationPage;
