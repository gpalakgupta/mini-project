import { useState } from "react";

export default function MediBot() {
  const [symptoms, setSymptoms] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!symptoms && !file) {
      alert("Please enter symptoms or upload an image!");
      return;
    }

    // For now, just show alert (later connect backend/AI)
    alert("Submitted successfully! MediBot will analyze your input.");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-purple-50 via-white to-purple-100 px-6 py-16">
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-purple-700 mb-4 drop-shadow-sm">
        MediBot – Your AI Health Assistant
      </h2>
      <p className="text-gray-600 mb-10 max-w-2xl text-center text-lg">
        Describe your symptoms or upload images (like prescriptions or test
        results). MediBot will help guide your next steps.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-10 space-y-8"
      >
        {/* Symptoms Input */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Enter Your Symptoms
          </label>
          <textarea
            rows="5"
            placeholder="Describe your health issues here..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="w-full p-4 border rounded-xl border-gray-300 focus:ring-2 focus:ring-purple-300 outline-none"
          ></textarea>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Upload Report / Prescription
          </label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-3 border rounded-xl border-gray-300 bg-gray-50 cursor-pointer focus:ring-2 focus:ring-purple-300 outline-none"
          />
          {file && (
            <p className="mt-3 text-sm text-gray-600">
              Selected: <span className="font-medium">{file.name}</span>
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold rounded-xl hover:scale-105 hover:shadow-lg transition-transform duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
