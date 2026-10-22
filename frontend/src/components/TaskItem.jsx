import { CheckIcon, PencilIcon, TrashIcon } from './Icons.jsx';
import { formatDate, isOverdue } from '../utils/dates.js';

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const completed = Boolean(task.completed);
  const overdue = !completed && isOverdue(task.due_date);

  const classes = ['task', completed && 'is-done', overdue && 'is-overdue']
    .filter(Boolean)
    .join(' ');

  return (
    <li className={classes}>
      <label className="check">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(task)}
          aria-label={`${completed ? 'Mark as pending' : 'Mark as completed'}: ${task.title}`}
        />
        <span className="check-box">
          <CheckIcon />
        </span>
      </label>

      <div className="task-body">
        <span className="task-title">{task.title}</span>
        {task.due_date && (
          <span className="task-meta">
            <span className="task-due">Due {formatDate(task.due_date)}</span>
            {overdue && <span className="badge">Em atraso</span>}
          </span>
        )}
      </div>

      <div className="task-actions">
        <button
          type="button"
          className="action"
          onClick={() => onEdit(task)}
          aria-label={`Edit task: ${task.title}`}
          title="Edit"
        >
          <PencilIcon />
        </button>
        <button
          type="button"
          className="action action-danger"
          onClick={() => onDelete(task)}
          aria-label={`Delete task: ${task.title}`}
          title="Delete"
        >
          <TrashIcon />
        </button>
      </div>
    </li>
  );
}
