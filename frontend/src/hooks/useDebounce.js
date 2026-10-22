import { useEffect, useState } from 'react';

// Devolve `value` apenas depois que ele para de mudar por `delay` ms.
export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
