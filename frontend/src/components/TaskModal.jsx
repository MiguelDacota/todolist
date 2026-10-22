import { useEffect, useRef, useState } from 'react';

// Serve para "Create Task" (mode="create") e "Edit Task" (mode="edit").
export default function TaskModal({ mode, task, onClose, onSubmit }) {
  const isEdit = mode === 'edit';
  const [title, setTitle] = useState(task?.title ?? '');
  const [dueDate, setDueDate] = useState(task?.due_date?.slice(0, 10) ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Task name is required.');
      titleRef.current?.focus();
      return;
    }

    setSaving(true);
    setError('');
    try {
      await onSubmit({ title: title.trim(), dueDate: dueDate || null });
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <div
      className="overlay"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <form
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 id="modal-title">{isEdit ? 'Edit Task' : 'Create Task'}</h2>

        <label className="field">
          <span>Task name</span>
          <input
            ref={titleRef}
            type="text"
            value={title}
            maxLength={255}
            placeholder="What needs to be done?"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label className="field">
          <span>Due date (optional)</span>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <div className="modal-footer">
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create task'}
          </button>
        </div>
      </form>
    </div>
  );
}
