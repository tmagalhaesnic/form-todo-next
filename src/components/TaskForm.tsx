  import { useState } from 'react';
  import styles from '../app/styles/Task.module.css';
  import ClearTasksButton from './ClearTasksButton';
import TaskList from './TaskList';

  interface TaskFormProps {
    onAddTask: (content: string) => void;
  }

  const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
    const [content, setContent] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (content.length >= 5 && content.length <= 30) {
        onAddTask(content);
        setContent('');
        setError(null);
      } else {
        setError('Content must be between 5 and 30 characters');
      }
    };

    return (
      <div className={styles['input']} >
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={error ? styles['error-input'] : ''}
              placeholder="Add a new task"
            />
            <button type="submit" className={styles['add-button']}>Add Task</button>
          </div>
          {error && <p className={styles['error-message']}>{error}</p>}
        </form>
      </div>
    );
  };

  export default TaskForm;