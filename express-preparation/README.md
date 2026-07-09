# Express Practice PR Review

Proyecto pequeño de Express + TypeScript para practicar backend estilo PR.

## Setup

```bash
npm install
npm run dev
```

Health check:

```bash
curl http://localhost:3000/health
```

## Reglas del ejercicio

- Implementa un ejercicio a la vez.
- Mándale a ChatGPT solo los archivos que cambiaste, como si fuera un diff de PR.
- Prioriza código legible, validaciones, status codes correctos y manejo de errores.
- No uses base de datos real; todo vive en memoria en `src/data/db.ts`.
