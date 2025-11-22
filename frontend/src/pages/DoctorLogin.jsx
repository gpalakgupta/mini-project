import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiClient from "../services/apiClient";

export default function DoctorLogin() {
  const navigate = useNavigate();
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
      const { data } = await apiClient.post("/auth/login", { email, password });

      if (data.role !== "DOCTOR") {
        setError("Please login with a doctor account.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/search-doctor");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-blue-100 px-6 py-20">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-6">Doctor Login</h2>
        <p className="text-center text-gray-600 mb-8">
          Login to manage your patients and appointments
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-300 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-300 outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full p-4 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition disabled:opacity-60"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        {error && <p className="text-center text-red-500 font-semibold mt-4">{error}</p>}

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