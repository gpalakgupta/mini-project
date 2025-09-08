import { Link } from "react-router-dom";
import { Stethoscope, User, UserPlus, Heart, CalendarCheck, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-white to-blue-100 text-gray-800">
      
      {/* Navbar */}
      <header className="w-full px-8 py-4 flex justify-between items-center bg-white shadow-md sticky top-0 z-50">
        <div>
          <h1 className="text-2xl font-extrabold text-blue-600">MediAssist</h1>
          <p className="text-sm text-gray-500">Your Health, Simplified</p>
        </div>
        <nav className="space-x-6">
          <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
          <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
          <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 relative overflow-hidden bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
        
        {/* Animated Background Blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-300 rounded-full opacity-30 animate-blob"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-300 rounded-full opacity-30 animate-blob animation-delay-2000"></div>

        <h2 className="text-5xl sm:text-6xl font-bold text-blue-700 mb-4 leading-tight drop-shadow-md z-10">
          Your Digital Health Companion
        </h2>
        <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mb-12 z-10">
          Manage your medical records, book appointments, and connect with trusted doctors — all in one place.
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-4xl mb-12 z-10">
          <Link to="/doctor-login" className="flex flex-col items-center justify-center p-8 rounded-3xl shadow-2xl bg-gradient-to-tr from-blue-200 to-blue-400 hover:scale-105 transition-transform duration-300">
            <Stethoscope size={50} className="text-white mb-3" />
            <span className="text-xl font-bold text-white">Doctor Login</span>
          </Link>
          <Link to="/patient-login" className="flex flex-col items-center justify-center p-8 rounded-3xl shadow-2xl bg-gradient-to-tr from-green-200 to-green-400 hover:scale-105 transition-transform duration-300">
            <User size={50} className="text-white mb-3" />
            <span className="text-xl font-bold text-white">Patient Login</span>
          </Link>
          <Link to="/signup" className="flex flex-col items-center justify-center p-8 rounded-3xl shadow-2xl bg-gradient-to-tr from-purple-200 to-purple-400 hover:scale-105 transition-transform duration-300">
            <UserPlus size={50} className="text-white mb-3" />
            <span className="text-xl font-bold text-white">Sign Up</span>
          </Link>
        </div>

        {/* Floating Icons */}
        <Stethoscope size={40} className="absolute top-20 left-10 text-blue-300 animate-bounce-slow opacity-50" />
        <Heart size={30} className="absolute bottom-40 right-20 text-red-300 animate-bounce-slow opacity-50" />
        <CalendarCheck size={35} className="absolute top-60 right-10 text-green-300 animate-bounce-slow opacity-50" />
      </main>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <h3 className="text-4xl font-bold text-center text-blue-700 mb-12">Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <FileText size={40} className="text-purple-500 mb-4" />
            <h4 className="text-xl font-semibold mb-2">Medical Records</h4>
            <p className="text-gray-600">Securely store and access your medical history anytime, anywhere.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <CalendarCheck size={40} className="text-green-500 mb-4" />
            <h4 className="text-xl font-semibold mb-2">Appointments</h4>
            <p className="text-gray-600">Book appointments with doctors in just a few clicks.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <Heart size={40} className="text-red-500 mb-4" />
            <h4 className="text-xl font-semibold mb-2">Trusted Doctors</h4>
            <p className="text-gray-600">Connect with certified doctors and health specialists easily.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-50 via-white to-purple-50">
        <h3 className="text-4xl font-bold text-center text-blue-700 mb-12">What Our Users Say</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <p className="text-gray-700 mb-4">"MediAssist makes managing my appointments and records so easy!"</p>
            <h4 className="font-semibold text-blue-600">— Sarah K.</h4>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <p className="text-gray-700 mb-4">"I love connecting with my doctor instantly through the platform."</p>
            <h4 className="font-semibold text-blue-600">— Raj P.</h4>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <p className="text-gray-700 mb-4">"A complete digital health solution for busy people like me."</p>
            <h4 className="font-semibold text-blue-600">— Ananya S.</h4>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 py-8 text-center text-gray-700 shadow-inner mt-12">
        <p className="text-lg">© {new Date().getFullYear()} MediAssist. All rights reserved.</p>
        <p className="text-sm mt-2">Empowering your health journey with technology.</p>
      </footer>

      {/* Tailwind Custom Animations */}
      <style>
        {`
          @keyframes blob {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -20px) scale(1.1); }
            66% { transform: translate(-20px, 30px) scale(0.9); }
          }
          .animate-blob { animation: blob 8s infinite; }
          .animate-bounce-slow { animation: bounce 5s infinite alternate; }
          .animation-delay-2000 { animation-delay: 2s; }
        `}
      </style>
    </div>
  );
}
