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
    <div>
      <div onClick={() => setIsExpanded(!isExpanded)}>
        <h3>{task.title}</h3>
        <button type="button" onClick={() => onToggle(task.id)}>
          {task.completed ? 'Undo' : 'Done'}
        </button>
      </div>
      {isExpanded && (
        <div>
          {isEditing ? (
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button type="button" onClick={handleUpdate}>
                Save
              </button>
            </div>
          ) : (
            <div>
              <p>{task.description}</p>
              <p>Last updated: {new Date(task.lastUpdated).toLocaleString()}</p>
              <button type="button" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TaskItem;
