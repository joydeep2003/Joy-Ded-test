import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/client";
import Navbar from "../components/Navbar";

type Task = {
  id: string;
  title: string;
  description?: string;
  status?: string;
};

type ProjectDetailsResponse = {
  id: string;
  name: string;
  description?: string;
  tasks?: Task[];
};

export default function ProjectDetail() {
  const { id } = useParams();
  const [projectName, setProjectName] = useState("Project");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTasks = async () => {
    const res = await api.get<ProjectDetailsResponse>(`/projects/${id}`);
    setProjectName(res.data.name || "Project");
    setTasks(res.data.tasks || []);
  };

  const createTask = async () => {
    if (!title.trim()) return;
    await api.post(`/projects/${id}/tasks`, { title, description, status: "todo" });
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const updateStatus = async (taskId: string, status: string) => {
    await api.patch(`/tasks/${taskId}`, { status });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
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
          <div>
            <h2 style={{ marginBottom: 6 }}>{projectName}</h2>
            <Link to="/projects" className="project-meta">
              Back to all projects
            </Link>
          </div>
          <span className="status-pill">{tasks.length} tasks</span>
        </div>

        <div className="inline-form" style={{ marginBottom: 10 }}>
          <input
            className="text-input"
            value={title}
            placeholder="Task title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="primary-btn" onClick={createTask}>
            Add Task
          </button>
        </div>

        <input
          className="text-input"
          value={description}
          placeholder="Task description (optional)"
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
          <h2>Task List</h2>
        </div>

        {tasks.length === 0 ? (
          <p className="empty-note">No tasks yet. Add your first task above.</p>
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {tasks.map((task, index) => (
              <motion.article
                key={task.id}
                className="task-row"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <div className="task-main">
                  <p className="task-title">{task.title}</p>
                  <span className="status-pill">{task.status || "todo"}</span>
                </div>
                {task.status !== "done" ? (
                  <button
                    className="secondary-btn"
                    onClick={() => updateStatus(task.id, "done")}
                  >
                    Mark Done
                  </button>
                ) : null}
              </motion.article>
            ))}
          </div>
        )}
      </motion.section>
    </main>
  );
}
