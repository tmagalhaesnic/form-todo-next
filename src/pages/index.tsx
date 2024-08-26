import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import styles from '../app/styles/Task.module.css';

const Home: React.FC = () => {
  const addTask = async (content: string) => {
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    window.location.reload();
  };

  return (
    <div className={styles['to-do-list']}>
      <h1>To-Do List</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList />
    </div>
  );
};

export default Home;
