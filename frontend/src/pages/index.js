import { useEffect, useState } from "react";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
} from "../services/api";

import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import TaskFilter from "../components/TaskFilter";


export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); 
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        const data = await fetchTasks();
        if (!ignore) {
          setTasks(data);
        }
      } catch (err) {
        console.error(err);
        setErrMsg("Could not load tasks");
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  const visibleTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  // handlers pass to children
  async function handleAddTask(formData) {
    try {
      setErrMsg("");
      const newTask = await createTask(formData);
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      setErrMsg(err.message);
    }
  }

  async function handleUpdateTask(id, formData) {
    try {
      setErrMsg("");
      const updated = await updateTask(id, formData);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updated : task))
      );
    } catch (err) {
      setErrMsg(err.message);
    }
  }

  async function handleDeleteTask(id) {
    try {
      setErrMsg("");
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setErrMsg(err.message);
    }
  }

  async function handleToggleTask(id) {
    try {
      setErrMsg("");
      const toggled = await toggleTask(id);
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? toggled : t))
      );
    } catch (err) {
      setErrMsg(err.message);
    }
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <h1>Task Manager</h1>
      </header>

      <section className="controls-row">
        <TaskForm onAdd={handleAddTask} />
        <TaskFilter value={filter} onChange={setFilter} />
      </section>

      {loading ? (
        <div className="status-msg">Loading tasks...</div>
      ) : errMsg ? (
        <div className="status-msg error">{errMsg}</div>
      ) :  (
        <TaskList
          tasks={visibleTasks || []}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onSave={handleUpdateTask}
        />
      )}
    </main>
  );
}
