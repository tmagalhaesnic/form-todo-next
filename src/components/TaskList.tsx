import { useState, useEffect } from 'react';
import styles from '../app/styles/Task.module.css';

interface Task {
  id: number;
  content: string;
  is_done: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch('/api/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this task?')) {
      fetch('/api/tasks', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      }).then(() => setTasks(tasks.filter((task) => task.id !== id)));
    }
  };

  const handleToggleDone = (id: number, is_done: boolean) => {
    fetch('/api/tasks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, is_done: !is_done, content: '' }),
    }).then(() => setTasks(tasks.map((task) => (task.id === id ? { ...task, is_done: !is_done } : task))));
  };

  const handleClearTasks = () => {
    if (confirm('Are you sure you want to clear all tasks?')) {
      fetch('/api/tasks', { method: 'DELETE' })
        .then(() => setTasks([]))
        .catch((error) => console.error('Error clearing tasks:', error));
    }
  };
  
  return (
    <div className={styles['to-do-list']}>
      <button onClick={handleClearTasks} className={styles['add-button']}>
        Clear All Tasks
      </button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              style={{ textDecoration: task.is_done ? 'line-through' : 'none' }}
            >
              {task.content}
            </span>
            <button
              onClick={() => handleToggleDone(task.id, task.is_done)}
              className={task.is_done ? styles['undo-button'] : styles['done-button']}
            >
              {task.is_done ? 'Undo' : 'Done'}
            </button>
            <button
              onClick={() => handleDelete(task.id)}
              className={styles['delete-button']}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
