// eslint-disable-next-line no-unused-vars
import React, {useState} from "react";
import styles from "./BulkInvitationModal.module.css";
import {sendFile} from "../utils/getData";

const BulkInvitationModal = ({eventId, eventGroups, onClose}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState("");
    const [error, setError] = useState("");
    const [responseData, setResponseData] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    const allowedExtensions = ["csv", "txt"];

    const validateFile = (file) => {
        const extension = file.name.split(".").pop().toLowerCase();
        return allowedExtensions.includes(extension);
    };

    const handleFile = (file) => {
        if (file && validateFile(file)) {
            setSelectedFile(file);
            setError("");
        } else {
            setSelectedFile(null);
            setError("Invalid file type. Please upload a .csv or .txt file.");
        }
    };

    // Drag a file
    const handleInputChange = (e) => {
        handleFile(e.target.files[0]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!selectedFile) {
            setError("Please select a file.");
            return;
        }
        if (!selectedGroup) {
            setError("Please select an event group.");
            return;
        }

        try {
            console.log(selectedFile);
            const formData = new FormData();
            formData.append("file", selectedFile);

            // The endpoint expects eventId and eventGroupId in query parameters.
            const response = await sendFile(
                `/attendees/invite-csv?eventId=${encodeURIComponent(
                    eventId
                )}&eventGroupId=${encodeURIComponent(selectedGroup)}`,
                formData
            );
            console.log(response);

            const data = await response.json();
            setResponseData(data);
            // Do further processing with data.successful and data.unsuccessful as needed.
        } catch (err) {
            setError("An error occurred while sending invitations.");
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Send Bulk Invitations</h2>
                <p>Upload your .csv or .txt file here.</p>
                <div
                    className={`${styles.dropZone} ${
                        dragActive ? styles.active : ""
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {selectedFile ? (
                        <p>{selectedFile.name}</p>
                    ) : (
                        <p>
                            Drag and drop your file here, or click to select a
                            file
                        </p>
                    )}
                    <input
                        type="file"
                        onChange={handleInputChange}
                        accept=".csv,.txt"
                        className={styles.fileInput}
                    />
                </div>
                <br />
                <label htmlFor="eventGroup">Select Event Group:</label>
                <select
                    className={styles.inputField}
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                >
                    <option value="">Select Event Group</option>
                    {eventGroups[0].map((group) => (
                        <option
                            key={group.EventGroupID}
                            value={group.EventGroupID}
                        >
                            {group.Name}
                        </option>
                    ))}
                </select>
                {error && <div className={styles.error}>{error}</div>}
                <br />
                <button onClick={handleSubmit}>Submit</button>
                <button
                    onClick={onClose}
                    className={styles.closeModalButton}
                >
                    Close
                </button>
                {console.log(responseData)}
                {/* {responseData && (
                    <div className={styles.response}>
                        <h3>Invitation Results</h3>
                        <div>
                            <strong>Successful Invitations:</strong>
                            <ul>
                                {responseData.successful.map((item, idx) => (
                                    <li key={`success-${idx}`}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <strong>Unsuccessful Invitations:</strong>
                            <ul>
                                {responseData.unsuccessful.map((item, idx) => (
                                    <li key={`fail-${idx}`}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default BulkInvitationModal;
