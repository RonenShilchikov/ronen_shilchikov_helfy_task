import { useState } from "react";


export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [priority, setPriority] = useState("low");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    await onAdd({
      title,
      description,
      priority,
    });

    // reset form after submit
    setTitle("");
    setDesc("");
    setPriority("low");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="text-input"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        className="text-input"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDesc(e.target.value)}
      />

      <select
        className={`priority-select ${priority}`}
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>

      <button className="btn-primary" type="submit">
        Add
      </button>
    </form>
  );
}
