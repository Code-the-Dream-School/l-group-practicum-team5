# Gatherly Frontend

This folder contains the frontend for Gatherly.

The frontend is built with React, TypeScript, Vite, Tailwind CSS, and service files that communicate with the backend API.

## Tech Stack

* React
* TypeScript
* Vite
* Tailwind CSS
* ESLint
* Render

## Local Setup

From the project root:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs locally on:

```text
http://localhost:5173
```

## Environment Variables

Create a `.env` file inside the `frontend` folder if needed.

Local development example:

```env
VITE_API_URL=http://localhost:8080/api
```

For production, `VITE_API_URL` should point to the deployed backend API URL.

Do not commit real secret values. Frontend environment variables are visible in the browser, so only public frontend configuration should be used here.

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Main Frontend Areas

The frontend includes:

* Authentication pages and forms
* Dashboard layout
* Group-related UI
* Event-related UI
* Idea-related UI
* Shared components
* API service files

## API Connection

Frontend API calls are organized through service files in:

```text
frontend/src/services/
```

The API client uses `VITE_API_URL` when provided and falls back to the local backend URL for local development.

Auth requests use credentialed requests so the browser can send the authentication cookie.

## Design Docs

Wireframes and design-related files are stored in:

```text
frontend/docs/wireframes/
```

## License

This project is for educational purposes only.
