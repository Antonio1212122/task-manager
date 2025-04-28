'use client';
import { useState } from "react";

interface Task {
  id: number;
  title: string;
}

export default function TaskList({ tasks }: { tasks: Task[] }) {
  const taskList = tasks;

  const handleEdit = async (id: number, currentTitle: string) => {
    const title = prompt("Nuevo título:", currentTitle);
    if (title && title !== currentTitle) {
      await fetch("/api/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title }),
      });
      location.reload();
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Eliminar tarea?")) {
      await fetch("/api/tasks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      location.reload();
    }
  };

  return (
    <ul>
      {taskList.map((task) => (
        <li key={task.id} style={{ marginBottom: "1rem" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#f0f0f0",
            padding: "10px",
            borderRadius: "6px",
          }}>
            <span>{task.title}</span>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => handleEdit(task.id, task.title)}
                style={{ padding: "4px 8px", background: "#ffc107", border: "none", borderRadius: "4px" }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                style={{ padding: "4px 8px", background: "#dc3545", color: "white", border: "none", borderRadius: "4px" }}
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
