import { useState, useEffect } from 'react';
import styles from '../app/styles/Task.module.css';
import ClearTasksButton from './ClearTasksButton';

interface Task {
  id: number;
  content: string;
  is_done: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>('');


  useEffect(() => {
    fetch('/api/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const handleUpdate = (id: number, newContent: string) => {
    fetch('/api/tasks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, content: newContent, is_done: false }), // Assuming you want to reset is_done on update
    }).then(() => {
      setTasks(tasks.map((task) =>
        task.id === id ? { ...task, content: newContent } : task
      ));
    }).catch((error) => console.error('Error updating task:', error));
  };

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
      <ClearTasksButton setTasks={setTasks} />
  
      <ul className={styles['task-list']}>
        {tasks.map((task) => (
          <li key={task.id}>
            {editTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <button
                  onClick={() => {
                    handleUpdate(task.id, editContent);
                    setEditTaskId(null);
                  }}
                  className={styles['add-button']}
                >
                  Save
                </button>
                <button
                  onClick={() => setEditTaskId(null)}
                  className={styles['delete-button']}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span
                  style={{ textDecoration: task.is_done ? 'line-through' : 'none' }}
                >
                  {task.content}
                </span>
                <div>
                <button
                  onClick={() => handleToggleDone(task.id, task.is_done)}
                  className={task.is_done ? styles['done-button'] : styles['done-button']}
                >
                  {task.is_done ? 'Undo' : 'Done'}
                </button>
                <button
                  onClick={() => {
                    setEditTaskId(task.id);
                    setEditContent(task.content);
                  }}
                  className={styles['edit-button']}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className={styles['delete-button']}
                >
                  Delete
                </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}  
export default TaskList;
