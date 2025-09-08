import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import PatientLogin from "./pages/PatientLogin";
import DoctorLogin from "./pages/DoctorLogin";
import PatientDashboard from "./pages/PatientDashboard";
import MediBot from "./pages/MediBot";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Signup */}
        <Route path="/signup" element={<Signup />} />

        {/* Login Pages */}
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />

        {/* Patient Dashboard */}
        <Route path="/patient-dashboard" element={<PatientDashboard />} />

        {/* MediBot */}
        <Route path="/medibot" element={<MediBot />} />
      </Routes>
    </Router>
  );
}
git co