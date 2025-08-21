import { useEffect, useState } from "react";
import axios from "axios";

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/doctors")
      .then(res => setDoctors(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Doctors</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Specialization</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(doc => (
            <tr key={doc.id}>
              <td className="p-2">{doc.name}</td>
              <td className="p-2">{doc.specialization}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
