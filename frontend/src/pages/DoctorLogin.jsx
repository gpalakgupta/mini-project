import { Link } from "react-router-dom";

export default function DoctorLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-blue-100 px-6 py-20">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-6">Doctor Login</h2>
        <p className="text-center text-gray-600 mb-8">
          Login to manage your patients and appointments
        </p>

        <form className="space-y-6">
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
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}