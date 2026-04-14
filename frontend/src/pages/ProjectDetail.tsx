import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/client";
import Navbar from "../components/Navbar";

export default function ProjectDetail() {
  const { id } = useParams();
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await api.get(`/projects/${id}`);
    setTasks(res.data.tasks || []);
  };

  const createTask = async () => {
    await api.post(`/projects/${id}/tasks`, { title });
    setTitle("");
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
    <div>
      <Navbar />
      <h2>Tasks</h2>

      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={createTask}>Add Task</button>

      {tasks.map(t => (
        <div key={t.id}>
          {t.title} - {t.status}
          <button onClick={() => updateStatus(t.id, "done")}>Done</button>
        </div>
      ))}
    </div>
  );
}