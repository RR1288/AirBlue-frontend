import React, {useEffect, useState} from "react";
import {useNavigate, Link, useSearchParams} from "react-router-dom";
import Header from "../components/Header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import styles from "./EventCreationPage.module.css";
import getData from "../utils/getData";
import FooterNoLink from "../components/FooterNoLink";

const AcceptEventInvitePage = () => {
    const [accepted, setAccepted] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const inviteToken = searchParams.get("invitation");
    
    async function sendData(method, endpoint) {
        const apiUrl = `${import.meta.env.VITE_API_URL}${endpoint}?invitation=${inviteToken}`; // Pass token as query parameter

        const tokenFromLocalStorage = localStorage.getItem("token"); // Get token from localStorage
        try {
            const response = await fetch(apiUrl, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${tokenFromLocalStorage}`, // Attach token to request
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }

            return await response.json(); // Return parsed JSON if successful
        } catch (error) {
            console.error("Error sending data:", error);
            throw error;
        }
    }

    useEffect(() => {
        if (inviteToken) {
            const acceptEndpoint = `/events/invitations/accept?invitation=${inviteToken}`; 
            console.log(acceptEndpoint)
            sendData("POST", "/events/invitations/accept")
                .then(() => {
                    setAccepted(true);
                    setTimeout(() => {
                        navigate("/my-events"); // Redirect after accepting the invite
                    }, 1000);
                })
                .catch((error) => {
                    // Handle error (you can show an error message here)
                    console.error("Failed to accept invite:", error);
                    // Optionally set a state to display error UI
                });
        }
    }, [inviteToken, navigate]);


return (
    <div className={styles.page}>
            <Header
                title="AirBlue System"
                hideSidebar={true}
            />

            <div className={styles.mainContent}>
                <div>
                    {accepted ? (
                        <div>
                            <h2>Invite Accepted</h2>
                            <p>Redirecting to events page...</p>
                        </div>
                    ) : (
                        <div>
                            <h2>Processing Invite...</h2>
                            <p>Please wait...</p>
                        </div>
                    )}
                </div>
            </div>
            <FooterNoLink/>
    </div>
);
};

export default AcceptEventInvitePage;