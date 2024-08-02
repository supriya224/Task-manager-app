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
  // State to manage the list of tasks
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(''); // State to manage the search term

  // Fetch tasks from the API on component mount
  useEffect(() => {
    fetch('/task.json')
      .then((response) => response.json())
      .then((data: Task[]) => setTasks(data));
  }, []);

  // Function to add a new task
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

  // Function to update an existing task
  const updateTask = (id: number, updatedTask: Partial<Task>) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, ...updatedTask, lastUpdated: new Date().toISOString() }
          : task,
      ),
    );
  };

  // Function to toggle the completion status of a task
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  // Filter tasks based on the search term
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="mx-auto container h-screen">
      <div className="max-w-2xl mx-3 ">
        <h3 className="text-4xl font-bold my-4 text-white">Todo List</h3>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 mb-4 border rounded bg-gray-200  outline-none"
        />{' '}
        <TaskForm onAdd={addTask} />
      </div>
      <div className="mt-3 flex flex-wrap  ">
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
