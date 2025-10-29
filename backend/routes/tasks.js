
const express = require("express");
const router = express.Router();

let tasks = [];
let nextId = 1;



function respondError(res, statusCode, message) {
  return res.status(statusCode).json({ error: message });
}

function validateTaskBody(body, { allowCompleted = false } = {}) {
  const { title, description, priority, completed } = body;
  const allowedPriorities = ["low", "medium", "high"];

  if (!title || typeof title !== "string" || !title.trim()) {
    return "Task 'title' is required and must be a non-empty string.";
  }

  if (description !== undefined && typeof description !== "string") {
    return "Task 'description' must be a string.";
  }

  if (!priority || !allowedPriorities.includes(priority)) {
    return "Task 'priority' must be one of: low, medium, high.";
  }

  if (allowCompleted && completed !== undefined && typeof completed !== "boolean") {
    return "Task 'completed' must be a boolean.";
  }

  return null; 
}

// small helper to find a task index by :id param
function findTaskIndex(idParam) {
  const id = parseInt(idParam, 10);
  if (Number.isNaN(id)) return -1;
  return tasks.findIndex(t => t.id === id);
}


// Get all tasks
router.get("/", (req, res) => {
  return res.json(tasks);
});


// Create a new task
router.post("/", (req, res) => {
  const validationError = validateTaskBody(req.body);
  if (validationError) {
    return respondError(res, 400, validationError);
  }

  const { title, description = "", priority } = req.body;

  const newTask = {
    id: nextId++,
    title: title.trim(),
    description: description.trim(),
    priority,
    completed: false,
    createdAt: new Date(), 
  };

  tasks.push(newTask);
  return res.status(201).json(newTask);
});

// Update an existing task (full replace of fields)
router.put("/:id", (req, res) => {
  const idx = findTaskIndex(req.params.id);
  if (idx === -1) {
    return respondError(res, 404, "Task not found.");
  }

  
  const validationError = validateTaskBody(req.body, { allowCompleted: true });
  if (validationError) {
    return respondError(res, 400, validationError);
  }

  const { title, description = "", priority, completed = false } = req.body;

  const updatedTask = {
    ...tasks[idx],
    title: title.trim(),
    description: description.trim(),
    priority,
    completed: Boolean(completed),
  };

  tasks[idx] = updatedTask;
  return res.json(updatedTask);
});

// Remove a task
router.delete("/:id", (req, res) => {
  const idx = findTaskIndex(req.params.id);
  if (idx === -1) {
    return respondError(res, 404, "Task not found.");
  }

  const removedTask = tasks.splice(idx, 1)[0];
  return res.json({
    message: "Task deleted",
    task: removedTask,
  });
});

// Flip the 'completed' boolean
router.patch("/:id/toggle", (req, res) => {
  const idx = findTaskIndex(req.params.id);
  if (idx === -1) {
    return respondError(res, 404, "Task not found.");
  }

  tasks[idx].completed = !tasks[idx].completed;
  return res.json(tasks[idx]);
});

module.exports = router;
