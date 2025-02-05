import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ManageEventsPage from './pages/ManageEventsPage';
import ManageAttendeesPage from './pages/ManageAttendeesPage'; // Correct file path
import EventDetailPage from './pages/EventDetailPage';
import LoginPage from './pages/LoginPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/manage-events" element={<ManageEventsPage />} />
                <Route path="/manage-attendees" element={<ManageAttendeesPage />} />
                <Route path="/event-details" element={<EventDetailPage/>} />
                <Route path="/login" element={<LoginPage/>} />
            </Routes>
        </Router>
    );
}

export default App;
