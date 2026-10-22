const BASE = import.meta.env.VITE_API_URL ?? '';

async function request(path, { method = 'GET', body, signal } = {}) {
  const hasBody = body !== undefined;

  const res = await fetch(`${BASE}${path}`, {
    method,
    signal,
    // Só envia Content-Type quando há corpo: o Fastify rejeita
    // "application/json" com corpo vazio (ex.: no DELETE).
    headers: hasBody ? { 'Content-Type': 'application/json' } : undefined,
    body: hasBody ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204) return null;

  let data = null;
  try {
    data = await res.json();
  } catch {
    /* resposta sem JSON */
  }

  if (!res.ok) {
    throw new Error(data?.message || `Request failed (${res.status})`);
  }
  return data;
}

export function listTasks({ search = '', status = 'all' }, signal) {
  const params = new URLSearchParams({ search, status });
  return request(`/api/tasks?${params}`, { signal });
}

export function createTask({ title, dueDate }) {
  return request('/api/tasks', { method: 'POST', body: { title, dueDate } });
}

export function updateTask(id, changes) {
  return request(`/api/tasks/${id}`, { method: 'PATCH', body: changes });
}

export function deleteTask(id) {
  return request(`/api/tasks/${id}`, { method: 'DELETE' });
}
