import { useState, useEffect } from "react";
import axios from "axios";
import AppointmentForm from "../components/AppointmentForm";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/appointments")
      .then(res => setAppointments(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAdded = (newAppt) => setAppointments([...appointments, newAppt]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Appointments</h2>
      <AppointmentForm onAdded={handleAdded} />
      <ul className="mt-4">
        {appointments.map(appt => (
          <li key={appt.id} className="border p-2 mb-2">
            {appt.patient} with Dr. {appt.doctor} on {appt.date}
          </li>
        ))}
      </ul>
    </div>
  );
}
