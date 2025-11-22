import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiClient from "../services/apiClient";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "PATIENT",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: null, text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage({ type: null, text: "" });

    if (!formData.name || !formData.email || !formData.password) {
      setStatusMessage({ type: "error", text: "All fields are required." });
      return;
    }

    setIsSubmitting(true);
    try {
      await apiClient.post("/auth/register", formData);
      setStatusMessage({
        type: "success",
        text: "Account created! Redirecting you to login...",
      });

      setTimeout(() => {
        navigate(formData.role === "DOCTOR" ? "/doctor-login" : "/patient-login");
      }, 800);
    } catch (error) {
      setStatusMessage({
        type: "error",
        text: error.response?.data?.message || "Unable to create the account.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-blue-100 px-6 py-20">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-6">Sign Up</h2>
        <p className="text-center text-gray-600 mb-8">
          Create your account to get started
        </p>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-300 outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-300 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-300 outline-none"
          />
          <div className="flex gap-4">
            <label className="flex-1">
              <span className="block text-sm font-semibold text-gray-600 mb-2">I am a</span>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-300 outline-none"
              >
                <option value="PATIENT">Patient</option>
                <option value="DOCTOR">Doctor</option>
              </select>
            </label>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-4 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition disabled:opacity-60"
          >
            {isSubmitting ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {statusMessage.text && (
          <p
            className={`mt-4 text-center text-sm font-semibold ${
              statusMessage.type === "success" ? "text-green-600" : "text-red-500"
            }`}
          >
            {statusMessage.text}
          </p>
        )}

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