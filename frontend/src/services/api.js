// src/services/api.js
// Helper functions for talking to your backend (http://localhost:4000)

const API_BASE = "http://localhost:4000/api/tasks";

export async function fetchTasks() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Failed to load tasks");
  return res.json();
}

export async function createTask(data) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to create task");
  }
  return res.json();
}

export async function updateTask(id, data) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to update task");
  }
  return res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to delete task");
  }
  return res.json();
}

export async function toggleTask(id) {
  const res = await fetch(`${API_BASE}/${id}/toggle`, {
    method: "PATCH",
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to toggle task");
  }
  return res.json();
}
