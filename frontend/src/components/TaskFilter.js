

export default function TaskFilter({ value, onChange }) {
  return (
    <div className="task-filter">
      <button
        className={value === "all" ? "active" : ""}
        onClick={() => onChange("all")}
      >
        All
      </button>

      <button
        className={value === "completed" ? "active" : ""}
        onClick={() => onChange("completed")}
      >
        Completed
      </button>

      <button
        className={value === "pending" ? "active" : ""}
        onClick={() => onChange("pending")}
      >
        Pending
      </button>
    </div>
  );
}
