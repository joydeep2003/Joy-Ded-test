import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/client";
import Navbar from "../components/Navbar";

type Project = {
  id: string;
  name: string;
  description?: string;
  created_at?: string;
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const fetchProjects = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  const createProject = async () => {
    if (!name.trim()) return;
    await api.post("/projects", { name, description });
    setName("");
    setDescription("");
    fetchProjects();
  };

  const startEditProject = (project: Project) => {
    setEditingProjectId(project.id);
    setEditName(project.name || "");
    setEditDescription(project.description || "");
  };

  const cancelEditProject = () => {
    setEditingProjectId(null);
    setEditName("");
    setEditDescription("");
  };

  const saveProject = async () => {
    if (!editingProjectId || !editName.trim()) return;
    await api.patch(`/projects/${editingProjectId}`, {
      name: editName,
      description: editDescription,
    });
    cancelEditProject();
    fetchProjects();
  };

  const deleteProject = async (projectId: string) => {
    await api.delete(`/projects/${projectId}`);
    if (editingProjectId === projectId) {
      cancelEditProject();
    }
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <main className="page-shell">
      <Navbar />

      <motion.section
        className="section-card glass-card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="section-head">
          <h2>Your Projects</h2>
          <span className="status-pill">{projects.length} total</span>
        </div>

        <div className="inline-form" style={{ marginBottom: 10 }}>
          <input
            className="text-input"
            value={name}
            placeholder="Project name"
            onChange={(e) => setName(e.target.value)}
          />
          <button className="primary-btn" onClick={createProject}>
            Create
          </button>
        </div>

        <input
          className="text-input"
          value={description}
          placeholder="Short description (optional)"
          onChange={(e) => setDescription(e.target.value)}
        />
      </motion.section>

      <motion.section
        className="section-card glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.08 }}
      >
        <div className="section-head">
          <h2>Project Board</h2>
        </div>

        {projects.length === 0 ? (
          <p className="empty-note">No projects yet. Create your first project to get started.</p>
        ) : (
          <div className="cards-grid">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <div className="project-card">
                  {editingProjectId === project.id ? (
                    <>
                      <input
                        className="text-input"
                        value={editName}
                        placeholder="Project name"
                        onChange={(e) => setEditName(e.target.value)}
                      />
                      <input
                        className="text-input"
                        value={editDescription}
                        placeholder="Project description"
                        onChange={(e) => setEditDescription(e.target.value)}
                        style={{ marginTop: 8 }}
                      />
                      <div className="inline-form" style={{ marginTop: 10 }}>
                        <button className="secondary-btn" onClick={saveProject}>
                          Save
                        </button>
                        <button className="secondary-btn" onClick={cancelEditProject}>
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="project-card-title">{project.name}</h3>
                      <p className="project-meta">
                        {project.description?.trim() || "No description added yet"}
                      </p>
                      <div className="inline-form" style={{ marginTop: 10 }}>
                        <Link to={`/projects/${project.id}`} className="secondary-btn">
                          Open
                        </Link>
                        <button
                          className="secondary-btn"
                          onClick={() => startEditProject(project)}
                        >
                          Edit
                        </button>
                        <button
                          className="secondary-btn"
                          onClick={() => deleteProject(project.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>
    </main>
  );
}
