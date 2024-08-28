import { useState, useEffect } from 'react';
import styles from '../app/styles/Task.module.css';
import ClearTasksButton from './ClearTasksButton';
import TaskForm from './TaskForm';

interface Task {
  id: number;
  content: string;
  is_done: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>('');

  const fetchTasks = async () => {
    const res = await fetch('/api/tasks');
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async (content: string) => {
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    await fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleUpdate = (id: number, newContent: string) => {
    fetch('/api/tasks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, content: newContent, is_done: false }),
    }).then(() => fetchTasks()).catch((error) => console.error('Error updating task:', error));
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this task?')) {
      fetch('/api/tasks', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      }).then(() => fetchTasks()).catch((error) => console.error('Error deleting task:', error));
    }
  };

  const handleToggleDone = (id: number, is_done: boolean) => {
    fetch('/api/tasks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, is_done: !is_done, content: '' }),
    }).then(() => fetchTasks()).catch((error) => console.error('Error toggling task status:', error));
  };

  return (
    <div className={styles['to-do-list']}>

      <h1>To-Do List</h1>
      <TaskForm onAddTask={addTask} />
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
                  className={styles['done-button']}
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
