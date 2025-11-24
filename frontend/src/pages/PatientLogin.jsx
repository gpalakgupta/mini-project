import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function PatientLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password!");
      return;
    }

    setLoading(true);
    try {
      const result = await login(email, password);

      if (!result.success) {
        setError(result.error || "Invalid credentials. Please try again.");
        return;
      }

      // Check if user is a patient
      if (result.data.role !== "PATIENT") {
        setError("Please login with a patient account.");
        return;
      }

      // Redirect to intended page or dashboard
      const from = location.state?.from?.pathname || "/patient-dashboard";
      navigate(from, { replace: true });
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 via-white to-green-100 px-6 py-20">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">
        <h2 className="text-4xl font-bold text-center text-green-700 mb-6">Patient Login</h2>
        <p className="text-center text-gray-600 mb-8">
          Login to manage your health and book appointments
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-300 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-300 outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full p-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition disabled:opacity-60"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        {error && <p className="text-center text-red-500 font-semibold mt-4">{error}</p>}

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}