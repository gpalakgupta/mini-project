// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // Pages
// import Home from "./pages/Home";
// import Signup from "./pages/Signup";
// import PatientLogin from "./pages/PatientLogin";
// import DoctorLogin from "./pages/DoctorLogin";
// import PatientDashboard from "./pages/PatientDashboard";
// import MediBot from "./pages/MediBot";
// import Navbar from "./components/Navbar";


// export default function App() {
//   return (
//     <Router>
//       {/* Navbar will always be visible */}
//       <Navbar />
//       <Routes>
//         {/* Home */}
//         <Route path="/" element={<Home />} />

//         {/* Signup */}
//         <Route path="/signup" element={<Signup />} />

//         {/* Login Pages */}
//         <Route path="/patient-login" element={<PatientLogin />} />
//         <Route path="/doctor-login" element={<DoctorLogin />} />

//         {/* Patient Dashboard */}
//         <Route path="/patient-dashboard" element={<PatientDashboard />} />

//         {/* MediBot */}
//         <Route path="/medibot" element={<MediBot />} />
//       </Routes>
//     </Router>
//   );
// }
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import PatientLogin from "./pages/PatientLogin";
import DoctorLogin from "./pages/DoctorLogin";
import PatientDashboard from "./pages/PatientDashboard";
import MediBot from "./pages/MediBot";
import SearchDoctor from "./components/SearchDoctor";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function Layout() {
  const location = useLocation();

  // Routes where Navbar should be hidden
  const hideNavbarRoutes = ["/", "/signup", "/patient-login", "/doctor-login"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* Show Navbar only if not in hideNavbarRoutes */}
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        <Route
          path="/patient-login"
          element={
            <PublicRoute>
              <PatientLogin />
            </PublicRoute>
          }
        />
        
        <Route
          path="/doctor-login"
          element={
            <PublicRoute>
              <DoctorLogin />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/patient-dashboard"
          element={
            <ProtectedRoute requiredRole="PATIENT">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/search-doctor"
          element={
            <ProtectedRoute requiredRole="DOCTOR">
              <SearchDoctor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/medibot"
          element={
            <ProtectedRoute>
              <MediBot />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}