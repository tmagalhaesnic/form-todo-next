
import React from 'react';
import styles from '../app/styles/Task.module.css';

interface ClearTasksButtonProps {
  setTasks: React.Dispatch<React.SetStateAction<any[]>>;
}

const ClearTasksButton: React.FC<ClearTasksButtonProps> = ({ setTasks }) => {
  const handleClearTasks = (e:any) => {
    e.preventDefault();
    if (confirm('Are you sure you want to clear all tasks?')) {
      fetch('/api/tasks', { method: 'DELETE' })
        .then(() => setTasks([]))
        .catch((error) => console.error('Error clearing tasks:', error));
    }
  };

  return (
    <button
      type="button"
      onClick={handleClearTasks}
      className={styles['clear-button']}
    >
      Clear All Tasks
    </button>
  );
};

export default ClearTasksButton;
