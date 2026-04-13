# API (Express + TypeScript) y base de datos

Backend dentro del repo **demo**: **Express**, **PostgreSQL** (`pg`), **JWT**, variables validadas con **Zod**.

El esquema SQL principal del producto está en la raíz del repo: **`../database/schema.sql`**.

## Requisitos

- **Node.js** 18+
- **PostgreSQL**

## Instalar dependencias

```bash
cd api
npm install
```

## Variables de entorno

```bash
copy .env.example .env
```

PowerShell:

```powershell
Copy-Item .env.example .env
```

| Variable | Descripción |
|----------|-------------|
| `NODE_ENV` | `development`, `test` o `production`. |
| `PORT` | Puerto HTTP (por defecto **4000** en `env.ts` si no se define otro). |
| `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` | Conexión PostgreSQL. |
| `DB_SSL` | `true` en bases en la nube que exijan TLS. |
| `JWT_SECRET` | Secreto para firmar tokens; obligatorio cambiarlo en producción. |

## Comandos

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Desarrollo con `tsx watch`. |
| `npm run build` | Compila a `dist/`. |
| `npm start` | Ejecuta `node dist/server.js` (después de `build`). |

## Base de datos: local y producción

### 1. Crear la base y aplicar el esquema

Desde la raíz del repo **demo** (un nivel por encima de `api/`):

```bash
psql "postgresql://USUARIO:PASSWORD@HOST:5432/NOMBRE_BD" -f database/schema.sql
```

### 2. Alinear `.env` de esta API

Los valores `DB_*` deben coincidir con la base donde aplicaste `schema.sql`.

### 3. Producción

1. Crea la instancia PostgreSQL (Neon, Supabase, RDS, etc.) y anota host, puerto, usuario, contraseña y nombre de BD.
2. Ejecuta `database/schema.sql` contra esa base vacía.
3. En el servidor, define las variables de entorno (o el mecanismo de secretos del hosting) con `DB_SSL=true` si el proveedor lo requiere y un `JWT_SECRET` largo y aleatorio.
4. Construye y arranca: `npm run build` y `npm start`.

### Migraciones en el otro repo

Si usas también **Api_concreto**, puede haber scripts SQL adicionales en su carpeta `database/` (por ejemplo cotizaciones). Aplícalos **después** de `schema.sql` y en el orden correcto según dependencias entre tablas.

## Frontend

El cliente web está en la raíz del repo **demo**. Configura allí `VITE_APP_API_PREFIX` apuntando a esta API (p. ej. `http://localhost:4000` si usas el `PORT` por defecto de esta carpeta).
