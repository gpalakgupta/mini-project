import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-blue-100 px-6 py-20">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-6">Sign Up</h2>
        <p className="text-center text-gray-600 mb-8">
          Create your account to get started
        </p>

        {/* Signup Form */}
        <form className="space-y-6">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-300 outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-300 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-300 outline-none"
          />
          <button
            type="submit"
            className="w-full p-4 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Login Options */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Already have an account? Login as:</p>
          <div className="flex justify-center gap-6">
            <Link
              to="/doctor-login"
              className="px-6 py-3 bg-blue-400 text-white rounded-xl font-semibold hover:bg-blue-500 transition"
            >
              Doctor Login
            </Link>
            <Link
              to="/patient-login"
              className="px-6 py-3 bg-green-400 text-white rounded-xl font-semibold hover:bg-green-500 transition"
            >
              Patient Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
