import { useEffect, useState } from "react";
import api from "../api/client";
import Navbar from "../components/Navbar";

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [name, setName] = useState("");

  const fetchProjects = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  const createProject = async () => {
    await api.post("/projects", { name });
    setName("");
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <Navbar />
      <h2>Projects</h2>

      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={createProject}>Create</button>

      {projects.map(p => (
        <div key={p.id}>
          <a href={`/projects/${p.id}`}>{p.name}</a>
        </div>
      ))}
    </div>
  );
}