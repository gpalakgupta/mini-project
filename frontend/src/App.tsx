import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Appointments from './pages/Appointments';
import DoctorList from './components/DoctorList';
import AppointmentForm from './components/AppointmentForm';

interface User {
  name: string;
  email: string;
  role: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | undefined>();

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleSignup = (userData: User) => {
    setUser(userData);
  };

  const handleBookAppointment = (doctorId: number) => {
    if (!user) {
      // Redirect to login if not authenticated
      return;
    }
    setSelectedDoctorId(doctorId);
    setShowAppointmentForm(true);
  };

  const handleAppointmentSubmit = (appointmentData: any) => {
    console.log('Appointment booked:', appointmentData);
    // Here you would typically send this to your backend
    setShowAppointmentForm(false);
    setSelectedDoctorId(undefined);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar
          isAuthenticated={!!user}
          user={user || undefined}
          onLogout={handleLogout}
        />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/login" 
              element={
                user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
              } 
            />
            <Route 
              path="/signup" 
              element={
                user ? <Navigate to="/" replace /> : <Signup onSignup={handleSignup} />
              } 
            />
            <Route 
              path="/doctors" 
              element={<DoctorList onBookAppointment={handleBookAppointment} />} 
            />
            <Route 
              path="/appointments" 
              element={
                user ? <Appointments /> : <Navigate to="/login" replace />
              } 
            />
          </Routes>
        </main>

        {/* Global Appointment Form Modal */}
        <AppointmentForm
          doctorId={selectedDoctorId}
          isOpen={showAppointmentForm}
          onClose={() => {
            setShowAppointmentForm(false);
            setSelectedDoctorId(undefined);
          }}
          onSubmit={handleAppointmentSubmit}
        />
      </div>
    </Router>
  );
}

export default App;