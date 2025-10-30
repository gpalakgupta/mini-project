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

// Navbar
import Navbar from "./components/Navbar";

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
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Signup */}
        <Route path="/signup" element={<Signup />} />

        {/* Login Pages */}
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />

        {/* Patient Dashboard */}
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        
        <Route path="/search-doctor" element={<SearchDoctor />} />


        {/* MediBot */}
        <Route path="/medibot" element={<MediBot />} />
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