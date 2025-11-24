import { useState } from "react";
import { motion } from "framer-motion";

function App() {
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [location, setLocation] = useState(null);

  // 🔄 Reverse Geocoding to get location name from lat/lon
  const getAddressFromCoordinates = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const data = await res.json();
      return data.display_name;
    } catch {
      return "Location unavailable";
    }
  };

  // 🎯 Analyze Symptoms Handler
  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) return;
    setLoading(true);

    try {
      // Get current GPS location
      const loc = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (pos) =>
            resolve({
              lat: pos.coords.latitude,
              lon: pos.coords.longitude,
            }),
          () => reject("Location permission denied")
        );
      });

      // Convert coordinates → Address
      const address = await getAddressFromCoordinates(loc.lat, loc.lon);
      setLocation({ address, lat: loc.lat, lon: loc.lon });

      // Fetch backend prediction
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symptoms,
          lat: loc.lat,
          lon: loc.lon,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("❌ Error: Please allow location and check backend connection.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex justify-center p-4">
      <div className="max-w-4xl w-full space-y-6">

        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-4xl font-bold text-gray-800"
        >
          🩺 Health Assist MedBot
        </motion.h1>

        {/* Chat styled input card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
        >
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Enter Symptoms
          </h2>

          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Example: fever, headache, vomiting ..."
            className="w-full p-4 border border-gray-300 rounded-xl outline-none focus:border-teal-500 transition"
          />

          <button
            onClick={analyzeSymptoms}
            disabled={loading}
            className="w-full mt-4 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition"
          >
            {loading ? "Analyzing..." : "🔍 Submit Symptoms"}
          </button>
        </motion.div>

        {/* Display Results */}
        {result && (
          <div className="space-y-6">

            {/* Predicted Disease */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <h3 className="font-semibold text-xl text-teal-700">
                🧠 Possible Condition
              </h3>
              <p className="text-2xl font-bold mt-2 text-gray-800">
                {result.predicted_disease}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                *This is an AI prediction. Please consult a doctor if symptoms continue.*
              </p>
            </motion.div>

            {/* Precautions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <h3 className="font-semibold text-xl text-teal-700">
                💊 Precautions
              </h3>
              <ul className="mt-3 space-y-2">
                {result.precautions.map((p, idx) => (
                  <li key={idx} className="p-3 rounded-xl bg-[#F3FDFE] text-gray-700">
                    • {p}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Map Section */}
            {location && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
              >
                <h3 className="font-semibold text-xl text-teal-700">
                  📍 Your Location
                </h3>
                <p className="text-gray-600 mt-1">{location.address}</p>

                <iframe
                  className="w-full h-64 rounded-xl mt-4 shadow-inner"
                  loading="lazy"
                  allowFullScreen
                  src={`https://www.google.com/maps?q=${encodeURIComponent(location.address)}&output=embed`}
                ></iframe>
              </motion.div>
            )}

            {/* Doctors Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <h3 className="font-semibold text-xl text-teal-700">
                👨‍⚕️ Nearby Doctors
              </h3>

              <div className="mt-4 space-y-4">
                {result.doctors.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border flex justify-between items-center hover:bg-gray-50 transition"
                  >
                    <div>
                      <p className="text-lg font-bold text-gray-800">{doc.name}</p>
                      <p className="text-sm text-gray-500">{doc.type}</p>
                      <p className="text-xs text-gray-400 mt-1">{doc.address}</p>
                    </div>

                    <a
                      href={`https://www.google.com/maps?q=${doc.name}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition"
                    >
                      View
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
