'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewTask() {
  const [title, setTitle] = useState('');
  const router = useRouter();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    router.push('/dashboard');
  };

  return (
    <div className="container">
      <h2>New Task</h2>
      <form onSubmit={handleCreate}>
        <input placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}
