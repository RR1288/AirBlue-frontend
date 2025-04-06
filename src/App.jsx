// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ManageEventsPage from './pages/ManageEventsPage';
import ManageAttendeesPage from './pages/ManageAttendeesPage'; 
import FinanceEventDetailsModal from './components/FinanceEventDetailsModal';
import LoginPage from './pages/LoginPage';
import UnderConstruction from './pages/UnderConstruction';
import EventEditPage from './pages/EventEditPage';
import EventCreationPage from './pages/EventCreationPage';
import FlightSearchPage from './pages/FlightSearchPage';
import ApprovalPage from './pages/ApprovalPage';
import AdminPage from './pages/AdminPage';
import SetUserInfoPage from './pages/SetUserInfoPage';
import RegisterPage from './pages/RegisterPage';
import AttendeeRegister from './pages/AttendeeRegister';
import PasswordResetPage from './pages/PasswordResetPage';
import UserInfoPage from './pages/UserInfoPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import MyEventsPage from './pages/MyEventsPage';
import EventsFinanceUser from './pages/FinanceEventsPage';
import { NotificationProvider } from './components/NotificationProvider';
import Enable2FAPage from './pages/Enable2FAPage';
import AcceptEventInvitePage from './pages/AcceptEventInvite';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './context/ProtectedRoute';



function App() {
    return (
        <AuthProvider>

        <NotificationProvider>
            <Router>
                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<LoginPage/>} />
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/under-construction" element={<UnderConstruction/>} />
                    <Route path="/register" element={<RegisterPage/>} />
                    <Route path="/password-reset" element={<PasswordResetPage/>} />
                    <Route path="/attendee-register" element={<AttendeeRegister/>} />
                    

                    {/* Protected routes, need to be authenticated */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/enable-2fa" element={<Enable2FAPage/>} />
                        <Route path="/user-info" element={<UserInfoPage/>} />
                    </Route>

                    {/* Event Planner */}
                    <Route element={<ProtectedRoute allowedRoles={['eventPlanner']} />}>
                        <Route path="/manage-events" element={<ManageEventsPage />} />
                        <Route path="/manage-attendees/:eventId" element={<ManageAttendeesPage />} />
                        <Route path="/event-edit" element={<EventEditPage/>} />
                        <Route path="/event-creation" element={<EventCreationPage/>} />
                        <Route path="/approval" element={<ApprovalPage/>} />
                    </Route>

                    {/* Finance Planner */}
                    <Route element={<ProtectedRoute allowedRoles={['financePlanner']} />}>
                        <Route path="/finance-events" element={<EventsFinanceUser/>} />
                    
                    </Route>

                    {/* Attendee */}
                    <Route element={<ProtectedRoute allowedRoles={['attendee']} />}>
                        <Route path="/flight-search/:eventId" element={<FlightSearchPage/>} />
                        <Route path="/accept-invite" element={<AcceptEventInvitePage/>} />
                        <Route path="/setuser-info" element={<SetUserInfoPage/>} />
                        <Route path="/my-events" element={<MyEventsPage/>} />
                    </Route>
                    
                    {/* Admin */}
                    <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                        <Route path="/admin" element={<AdminPage/>} />
                    </Route>


                </Routes>
            </Router>
        </NotificationProvider>
        </AuthProvider>
    );
}

export default App;
