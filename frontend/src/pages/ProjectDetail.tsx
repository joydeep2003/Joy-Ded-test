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
  const [projectDescription, setProjectDescription] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editProjectName, setEditProjectName] = useState("");
  const [editProjectDescription, setEditProjectDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTaskTitle, setEditTaskTitle] = useState("");
  const [editTaskDescription, setEditTaskDescription] = useState("");

  const fetchTasks = async () => {
    const res = await api.get<ProjectDetailsResponse>(`/projects/${id}`);
    setProjectName(res.data.name || "Project");
    setProjectDescription(res.data.description || "");
    setEditProjectName(res.data.name || "Project");
    setEditProjectDescription(res.data.description || "");
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

  const saveProject = async () => {
    if (!editProjectName.trim()) return;
    await api.patch(`/projects/${id}`, {
      name: editProjectName,
      description: editProjectDescription,
    });
    fetchTasks();
  };

  const startEditTask = (task: Task) => {
    setEditingTaskId(task.id);
    setEditTaskTitle(task.title || "");
    setEditTaskDescription(task.description || "");
  };

  const cancelEditTask = () => {
    setEditingTaskId(null);
    setEditTaskTitle("");
    setEditTaskDescription("");
  };

  const saveTask = async () => {
    if (!editingTaskId || !editTaskTitle.trim()) return;
    await api.patch(`/tasks/${editingTaskId}`, {
      title: editTaskTitle,
      description: editTaskDescription,
    });
    cancelEditTask();
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
            <p className="project-meta" style={{ marginTop: 0 }}>
              {projectDescription?.trim() || "No description added yet"}
            </p>
            <Link to="/projects" className="project-meta">
              Back to all projects
            </Link>
          </div>
          <span className="status-pill">{tasks.length} tasks</span>
        </div>

        <div style={{ display: "grid", gap: 8, marginBottom: 14 }}>
          <input
            className="text-input"
            value={editProjectName}
            placeholder="Project name"
            onChange={(e) => setEditProjectName(e.target.value)}
          />
          <input
            className="text-input"
            value={editProjectDescription}
            placeholder="Project description"
            onChange={(e) => setEditProjectDescription(e.target.value)}
          />
          <div className="inline-form">
            <button className="secondary-btn" onClick={saveProject}>
              Save Project Details
            </button>
          </div>
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
                  {editingTaskId === task.id ? (
                    <div style={{ display: "grid", gap: 8, minWidth: 250 }}>
                      <input
                        className="text-input"
                        value={editTaskTitle}
                        placeholder="Task title"
                        onChange={(e) => setEditTaskTitle(e.target.value)}
                      />
                      <input
                        className="text-input"
                        value={editTaskDescription}
                        placeholder="Task description"
                        onChange={(e) => setEditTaskDescription(e.target.value)}
                      />
                    </div>
                  ) : (
                    <>
                      <p className="task-title">{task.title}</p>
                      <p className="project-meta" style={{ margin: 0 }}>
                        {task.description?.trim() || "No description added yet"}
                      </p>
                    </>
                  )}
                  <span className="status-pill">{task.status || "todo"}</span>
                </div>
                <div className="inline-form">
                  {editingTaskId === task.id ? (
                    <>
                      <button className="secondary-btn" onClick={saveTask}>
                        Save
                      </button>
                      <button className="secondary-btn" onClick={cancelEditTask}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="secondary-btn"
                        onClick={() => startEditTask(task)}
                      >
                        Edit
                      </button>
                      {task.status !== "done" ? (
                        <button
                          className="secondary-btn"
                          onClick={() => updateStatus(task.id, "done")}
                        >
                          Mark Done
                        </button>
                      ) : null}
                    </>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </motion.section>
    </main>
  );
}
