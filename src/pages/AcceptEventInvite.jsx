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

    useEffect(() => {
        if (inviteToken) {
            setAccepted(true);
            getData("POST", "/events/invitations/accept",inviteToken)
            setTimeout(() => navigate("/my-events"), 1000);
        }
    }, [inviteToken]);


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