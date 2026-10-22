import { useCallback, useEffect, useRef, useState } from 'react';
import { createTask, deleteTask, listTasks, updateTask } from './api.js';
import { useDebounce } from './hooks/useDebounce.js';
import { useTheme } from './hooks/useTheme.js';
import TaskItem from './components/TaskItem.jsx';
import TaskModal from './components/TaskModal.jsx';
import {
  ChevronIcon,
  EmptyIllustration,
  MoonIcon,
  PlusIcon,
  SearchIcon,
  SunIcon,
} from './components/Icons.jsx';

export default function App() {
  const [theme, toggleTheme] = useTheme();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const debouncedSearch = useDebounce(search, 400);

  const [data, setData] = useState({ tasks: [], total: 0, completed: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(null); // { mode: 'create' } | { mode: 'edit', task }

  const abortRef = useRef(null);

  // A busca só chega ao servidor com o valor "debounced".
  // Requisições antigas são canceladas para não sobrescrever resultados novos.
  const load = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const result = await listTasks(
        { search: debouncedSearch.trim(), status },
        controller.signal
      );
      setData(result);
      setError('');
    } catch (err) {
      if (err.name === 'AbortError') return;
      setError('Could not load tasks. Check that the server is running.');
    } finally {
      if (abortRef.current === controller) setLoading(false);
    }
  }, [debouncedSearch, status]);

  useEffect(() => {
    load();
    return () => abortRef.current?.abort();
  }, [load]);

  const handleToggle = async (task) => {
    const completed = !task.completed;

    // Atualização otimista: a UI responde na hora e o refetch confirma depois.
    setData((prev) => ({
      ...prev,
      completed: prev.completed + (completed ? 1 : -1),
      tasks: prev.tasks.map((t) =>
        t.id === task.id ? { ...t, completed: completed ? 1 : 0 } : t
      ),
    }));

    try {
      await updateTask(task.id, { completed });
    } catch (err) {
      setError(err.message);
    }
    load();
  };

  const handleDelete = async (task) => {
    if (!window.confirm(`Delete "${task.title}"?`)) return;
    try {
      await deleteTask(task.id);
    } catch (err) {
      setError(err.message);
    }
    load();
  };

  const handleSave = async (payload) => {
    if (modal.mode === 'edit') {
      await updateTask(modal.task.id, payload);
    } else {
      await createTask(payload);
    }
    setModal(null);
    await load();
  };

  const closeModal = useCallback(() => setModal(null), []);

  const isEmpty = !loading && data.tasks.length === 0;

  return (
    <div className="app">
      <h1 className="title">TODO LIST</h1>

      <div className="toolbar">
        <label className="search">
          <SearchIcon />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search note..."
            aria-label="Search tasks"
          />
        </label>

        <div className="select">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            aria-label="Filter tasks by status"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <ChevronIcon />
        </div>

        <button
          type="button"
          className="theme-btn"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>

      <main className="content">
        <div className="stats" aria-live="polite">
          <span>
            <strong>{data.total}</strong> total
          </span>
          <span>
            <strong>{data.completed}</strong> completed
          </span>
        </div>

        {error && (
          <p className="banner" role="alert">
            {error}
          </p>
        )}

        {isEmpty ? (
          <div className="empty">
            <EmptyIllustration />
            <p>
              {debouncedSearch.trim()
                ? 'No tasks match your search.'
                : 'You have no pending tasks.'}
            </p>
          </div>
        ) : (
          <ul className="list">
            {data.tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggle}
                onEdit={(t) => setModal({ mode: 'edit', task: t })}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        )}
      </main>

      <button
        type="button"
        className="fab"
        onClick={() => setModal({ mode: 'create' })}
        aria-label="Create task"
        title="Create task"
      >
        <PlusIcon />
      </button>

      {modal && (
        <TaskModal
          mode={modal.mode}
          task={modal.task}
          onClose={closeModal}
          onSubmit={handleSave}
        />
      )}
    </div>
  );
}
