import { useState } from "react";

export default function TaskItem({ task, onToggle, onDelete, onSave }) {
  if (!task) {
    return (
      <div className="task-item">
        <div className="meta">loading…</div>
      </div>
    );
  }

  const [isEditing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);

  async function handleSave() {
    await onSave(task.id, {
      title,
      description,
      priority,
      completed: task.completed,
    });
    setEditing(false);
  }

  return (
    <div
      className={`task-item ${task.completed ? "done" : ""}`}
      style={{
        borderLeft: `6px solid ${
          task.priority === "high"
            ? "#d9534f"
            : task.priority === "medium"
            ? "#f0ad4e"
            : "#9acd32"
        }`,
      }}
    >
      {isEditing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
          <div className="actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <div className="meta">
            <span>{task.priority.toUpperCase()}</span>{" "}
            •{" "}
            {new Date(task.createdAt).toLocaleDateString()}
          </div>

          <div className="actions">
            <button onClick={() => onToggle(task.id)}>
              {task.completed ? "Undo" : "Done"}
            </button>
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}
