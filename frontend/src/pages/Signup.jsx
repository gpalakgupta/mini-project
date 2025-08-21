import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/signup", form)
      .then(() => alert("Signup successful"))
      .catch(() => alert("Signup failed"));
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-lg font-bold mb-2">Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input className="border p-2 w-full" placeholder="Name"
          onChange={e => setForm({...form, name: e.target.value})} />
        <input className="border p-2 w-full" placeholder="Email"
          onChange={e => setForm({...form, email: e.target.value})} />
        <input type="password" className="border p-2 w-full" placeholder="Password"
          onChange={e => setForm({...form, password: e.target.value})} />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Signup</button>
      </form>
    </div>
  );
}
