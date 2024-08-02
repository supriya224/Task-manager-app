/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import { useState } from 'react';

// Define types for the props
interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  lastUpdated: string;
}

interface TaskItemProps {
  task: Task;
  onUpdate: (id: number, updatedTask: Partial<Task>) => void;
  onToggle: (id: number) => void;
}

function TaskItem({ task, onUpdate, onToggle }: TaskItemProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(task.title);
  const [description, setDescription] = useState<string>(task.description);

  const handleUpdate = () => {
    onUpdate(task.id, { title, description });
    setIsEditing(false);
  };

  return (
    <section className="bg-gradient-to-b from-[#d2a8eb] to-[#88edff]  m-4 shadow-lg pb-3 shadow-gray-400 border">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="m-2 p-2 flex gap-32  bg-purple-200"
      >
        <h3>
          {' '}
          <span className="text-xl font-bold">Title: </span>
          {task.title}
        </h3>
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          className="bg-blue-400 text-white p-1 rounded-lg px-4"
        >
          {task.completed ? 'Undo' : 'Show'}
        </button>
      </div>
      {isExpanded && (
        <div className=" px-2">
          {isEditing ? (
            <div className=" ">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex gap-2 my-2 p-2 w-full rounded-lg border-none outline-none"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="flex gap-2 my-2 p-2 w-full rounded-lg border-none outline-none"
              />
              <button
                type="button"
                onClick={handleUpdate}
                className="flex gap-2 my-2 p-2 rounded-lg bg-indigo-900 text-white"
              >
                Save
              </button>
            </div>
          ) : (
            <div>
              <p className="text-md">
                {' '}
                <span className="text-xl font-bold"> Discription: </span>
                {task.description}
              </p>
              <p>
                {' '}
                <span className="font-bold"> Last update: </span>{' '}
                {new Date(task.lastUpdated).toLocaleString()}
              </p>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-sky-800 text-white p-1 px-4 rounded-lg mt-3"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default TaskItem;
