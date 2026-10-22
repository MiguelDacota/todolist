# Todo List – Frontend (React + Vite)

## Como rodar

1. Suba o backend (porta 3333) depois de executar o `schema.sql` no MySQL.
2. Neste diretório:

```bash
npm install
npm run dev
```

Abra http://localhost:5173. O Vite encaminha `/api/*` para `http://localhost:3333`
(veja `vite.config.js`), então não é preciso configurar CORS em desenvolvimento.

## Produção

Defina `VITE_API_URL` com a URL pública do backend (veja `.env.example`) e rode `npm run build`.
Nesse caso o backend precisa liberar PATCH e DELETE no CORS (veja a observação no fim da resposta).
