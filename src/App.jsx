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
import FinancePermission from './pages/FinancePermission';
import EventCreationPage from './pages/EventCreationPage';
import FlightSearchPage from './pages/FlightSearchPage';
import ApprovalPage from './pages/ApprovalPage';
import AdminPage from './pages/AdminPage';
import FinanceEventDetails from './pages/FinanceEventDetails';


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
                <Route path="/finance-permission" element={<FinancePermission/>} />
                <Route path="/event-creation" element={<EventCreationPage/>} />
                <Route path="/flight-search" element={<FlightSearchPage/>} />
                <Route path="/approval" element={<ApprovalPage/>} />
                <Route path="/admin" element={<AdminPage/>} />
                <Route path="/finance-details" element={<FinanceEventDetails/>} />
            
            </Routes>
        </Router>
    );
}

export default App;
