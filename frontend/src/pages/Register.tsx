import { useState } from "react";
import api from "../api/client";
import { setAuth } from "../auth/auth";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const res = await api.post("/auth/register", { name, email, password });
    setAuth(res.data.access_token);
    window.location.href = "/projects";
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="name" onChange={e => setName(e.target.value)} />
      <input placeholder="email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
