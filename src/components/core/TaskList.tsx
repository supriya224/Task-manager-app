// src/components/TaskList.tsx
import { useState, useEffect } from 'react';
import TaskItem from './TaskItems';
import TaskForm from './form/TaskForm';

// Define types for the task and task form
interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  lastUpdated: string;
}

interface NewTask {
  title: string;
  description: string;
}

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetch('/task.json')
      .then((response) => response.json())
      .then((data: Task[]) => setTasks(data));
  }, []);

  const addTask = (newTask: NewTask) => {
    const task: Task = {
      id: tasks.length + 1,
      title: newTask.title,
      description: newTask.description,
      completed: false,
      lastUpdated: new Date().toISOString(),
    };
    setTasks([...tasks, task]);
  };

  const updateTask = (id: number, updatedTask: Partial<Task>) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, ...updatedTask, lastUpdated: new Date().toISOString() }
          : task,
      ),
    );
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="mx-auto container">
      <div className="max-w-2xl text-center">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 mb-4 border rounded bg-gray-200 text-white"
        />{' '}
        <TaskForm onAdd={addTask} />
      </div>
      <div className=" mt-32 bg-pink-50 w-fit p-32 ">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={updateTask}
            onToggle={toggleTask}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;