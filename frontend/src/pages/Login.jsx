import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/login", form)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        alert("Login successful");
      })
      .catch(err => alert("Login failed"));
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-lg font-bold mb-2">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input className="border p-2 w-full" placeholder="Email"
          onChange={e => setForm({...form, email: e.target.value})} />
        <input type="password" className="border p-2 w-full" placeholder="Password"
          onChange={e => setForm({...form, password: e.target.value})} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
}
