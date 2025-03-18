// eslint-disable-next-line no-unused-vars
import React, {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import Header from "../components/Header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import styles from "./EventCreationPage.module.css";
import getData from "../utils/getData";
import { useNotifications } from "../components/NotificationProvider";

const EventCreationPage = () => {
    const { addNotification } = useNotifications();
    const [formData, setFormData] = useState({
        title: "",
        startDate: new Date(),
        endDate: new Date(),
        eventType: "",
        location: "",
        attendeeLimit: "",
        description: "",
    });

    const navigate = useNavigate();

    // Handles form input changes
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    // Handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert string to Date objects
        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);
        
        // TODO: check that start date is a future date
        if (start > end) {
            alert("Start date must be before the end date.");
            return;
        }

        // Convert to yyyy-mm-dd format
        const formattedStartDate = new Date(formData.startDate).toISOString().split('T')[0];
        const formattedEndDate = new Date(formData.endDate).toISOString().split('T')[0];

        // This is what the endpoint will accept
        const body = {
            name: formData.title,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            typeID: 1,
            description: formData.description,
            location: formData.location,
            maxAttendees: parseInt(formData.attendeeLimit)
        };
        
        // TODO: Validate data before submitting

        try {
            const response = await getData("POST", "/events/create-event", body);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                
                addNotification({
                    type: 'success',
                    title: 'Event successfully created!',
                    message: data.message,
                  });

                navigate("/manage-events"); // Redirect to manage events page
            } else {
                alert("Event creation failed. Please try again.");
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
                    <Link
                        to="/manage-events"
                        className={styles.backButton}
                    >
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            className={styles.icon}
                        />
                    </Link>
                    <h1 className={styles.eventTitle}>Create New Event</h1>
                </div>

                <form
                    className={styles.form}
                    onSubmit={handleSubmit}
                >
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
                        <label className={styles.label}>Start Date:</label>
                        <input
                            type="date"
                            name="dateStart"
                            className={styles.input}
                            value={formData.dateStart}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.row}>
                        <label className={styles.label}>End Date:</label>
                        <input
                            type="date"
                            name="dateEnd"
                            className={styles.input}
                            value={formData.dateEnd}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.row}>
                        {/* Retrieve event types from backend */}
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
                            name="attendeeLimit"
                            placeholder="Enter attendee limit"
                            className={styles.input}
                            value={formData.attendeeLimit}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.row}>
                        <label className={styles.label}>
                            Event Description:
                        </label>
                        <textarea
                            name="description"
                            placeholder="Provide a brief description"
                            className={styles.textarea}
                            value={formData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    {/* <div className={styles.row}>
                        <label className={styles.label}>Additional Notes:</label>
                        <textarea 
                            name="notes"
                            placeholder="Enter any additional notes" 
                            className={styles.textarea}
                            value={formData.notes}
                            onChange={handleChange}
                        ></textarea>
                    </div> */}

                    <div className={styles.buttonRow}>
                        <button
                            type="submit"
                            className={styles.createButton}
                        >
                            Create Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventCreationPage;
