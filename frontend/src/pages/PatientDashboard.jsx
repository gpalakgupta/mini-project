import { Link } from "react-router-dom";
import { MessageCircle, Search, FileText } from "lucide-react";

export default function PatientDashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-green-50 via-white to-green-100 px-6 py-20">
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-green-700 mb-4 drop-shadow-sm">
        Welcome to Your Dashboard
      </h2>
      <p className="text-center text-gray-600 mb-14 max-w-2xl text-lg">
        Explore your digital health tools — connect with MediBot, find doctors, and access your reports.
      </p>

      {/* Dashboard Options */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 w-full max-w-6xl">
        {/* MediBot */}
        <Link
          to="/medibot"
          className="flex flex-col items-center justify-center p-10 rounded-3xl shadow-xl bg-gradient-to-tr from-purple-400 to-purple-600 hover:scale-105 hover:shadow-2xl transition-transform duration-300"
        >
          <MessageCircle size={60} className="text-white mb-4" />
          <span className="text-2xl font-bold text-white">MediBot</span>
          <p className="text-white text-sm mt-3 text-center">
            Chat with your AI health assistant for instant guidance.
          </p>
        </Link>

        {/* Search Doctor */}
        <Link
          to="/search-doctor"
          className="flex flex-col items-center justify-center p-10 rounded-3xl shadow-xl bg-gradient-to-tr from-blue-400 to-blue-600 hover:scale-105 hover:shadow-2xl transition-transform duration-300"
        >
          <Search size={60} className="text-white mb-4" />
          <span className="text-2xl font-bold text-white">Search Doctor</span>
          <p className="text-white text-sm mt-3 text-center">
            Find the right doctor by specialization, location, or availability.
          </p>
        </Link>

        {/* View Report */}
        <Link
          to="/view-report"
          className="flex flex-col items-center justify-center p-10 rounded-3xl shadow-xl bg-gradient-to-tr from-green-400 to-green-600 hover:scale-105 hover:shadow-2xl transition-transform duration-300"
        >
          <FileText size={60} className="text-white mb-4" />
          <span className="text-2xl font-bold text-white">View Report</span>
          <p className="text-white text-sm mt-3 text-center">
            Access and manage your medical reports anytime securely.
          </p>
        </Link>
      </div>
    </div>
  );
}
