import React, { useState } from 'react';
import { Home, LogOut, Menu, X, Stethoscope, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    // Redirect based on user role or default to patient login
    if (user?.role === 'DOCTOR') {
      navigate("/doctor-login", { replace: true });
    } else {
      navigate("/patient-login", { replace: true });
    }
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleDashboard = () => {
    if (user?.role === 'DOCTOR') {
      navigate("/search-doctor");
    } else if (user?.role === 'PATIENT') {
      navigate("/patient-dashboard");
    }
  };



  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-800 hidden sm:block">
                Medi-Assist
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {isAuthenticated && user && (
                <div className="flex items-center space-x-2 text-gray-700 px-4 py-2">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{user.name}</span>
                  <span className="text-sm text-gray-500">({user.role})</span>
                </div>
              )}
              <button
                onClick={handleHome}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
              {isAuthenticated && (
                <button
                  onClick={handleDashboard}
                  className="flex items-center space-x-2 text-gray-700 hover:text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
              )}
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-all duration-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 rounded-lg mt-2 border border-gray-200">
              {isAuthenticated && user && (
                <div className="flex items-center space-x-3 text-gray-700 px-3 py-2 border-b border-gray-200 mb-2">
                  <User className="w-5 h-5" />
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.role}</div>
                  </div>
                </div>
              )}
              <button
                onClick={() => {
                  handleHome();
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200 font-medium w-full text-left"
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </button>
              {isAuthenticated && (
                <button
                  onClick={() => {
                    handleDashboard();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 text-gray-700 hover:text-green-600 hover:bg-green-50 px-3 py-2 rounded-lg transition-all duration-200 font-medium w-full text-left"
                >
                  <Stethoscope className="w-5 h-5" />
                  <span>Dashboard</span>
                </button>
              )}
              {isAuthenticated && (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 text-gray-700 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-all duration-200 font-medium w-full text-left"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;