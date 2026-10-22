// O backend usa dateStrings: true, então due_date chega como "YYYY-MM-DD".
// Comparamos strings ISO e montamos datas locais manualmente para evitar
// o deslocamento de fuso horário de new Date('YYYY-MM-DD').

const pad = (n) => String(n).padStart(2, '0');

export function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function isOverdue(dueDate) {
  if (!dueDate) return false;
  return dueDate.slice(0, 10) < todayISO();
}

export function formatDate(dueDate) {
  const [y, m, d] = dueDate.slice(0, 10).split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
