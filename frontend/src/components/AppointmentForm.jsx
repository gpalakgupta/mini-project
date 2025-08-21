import { useState } from "react";
import axios from "axios";

export default function AppointmentForm({ onAdded }) {
  const [form, setForm] = useState({ patient: "", doctor: "", date: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/appointments", form)
      .then(res => {
        onAdded(res.data);
        setForm({ patient: "", doctor: "", date: "" });
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input className="border p-2 w-full" placeholder="Patient" 
        value={form.patient} 
        onChange={e => setForm({...form, patient: e.target.value})} />
      <input className="border p-2 w-full" placeholder="Doctor" 
        value={form.doctor} 
        onChange={e => setForm({...form, doctor: e.target.value})} />
      <input type="date" className="border p-2 w-full" 
        value={form.date} 
        onChange={e => setForm({...form, date: e.target.value})} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Appointment</button>
    </form>
  );
}

