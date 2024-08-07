import { useState, FormEvent } from 'react';

// Define types for the props
interface NewTask {
  title: string;
  description: string;
}

interface TaskFormProps {
  onAdd: (newTask: NewTask) => void;
}

function TaskForm({ onAdd }: TaskFormProps) {
  // State to manage form input values
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="mb-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded outline-none"
        />
      </div>
      <div className="mb-2">
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded outline-none"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-700"
      >
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
