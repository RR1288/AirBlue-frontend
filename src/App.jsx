import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ManageEventsPage from './pages/ManageEventsPage';
import ManageAttendeesPage from './pages/ManageAttendeesPage'; 
import EventDetailPage from './pages/EventDetailPage';
import LoginPage from './pages/LoginPage';
import UnderConstruction from './pages/UnderConstruction';
import EventEditPage from './pages/EventEditPage';
import EventAttendeesPage from './pages/EventAttendeesPage'; 

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/manage-events" element={<ManageEventsPage />} />
                <Route path="/manage-attendees" element={<ManageAttendeesPage />} />
                <Route path="/event-details" element={<EventDetailPage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/event-edit" element={<EventEditPage/>} />
                <Route path="/event-attendees" element={<EventAttendeesPage/>} />                
                <Route path="/" element={<UnderConstruction/>} />
            </Routes>
        </Router>
    );
}

export default App;
