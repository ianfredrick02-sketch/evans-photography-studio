# Evans Photography Studio

A premium photography studio website built with React and Vite for Evans Photography Studio – Bamburi (Malindi Store), Mombasa, Kenya.

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   npm run dev
   ```
3. Open the local URL shown in the terminal.

## Production build

```bash
npm run build
```

## Admin setup

Set a secure password in a local environment file before enabling the dashboard:

```bash
cp .env.example .env
```

Then update `.env`:

```env
VITE_ADMIN_PASSWORD=replace_with_a_strong_password
```

Important: in production, use a secure backend and server-side authentication, not browser-only localStorage.
