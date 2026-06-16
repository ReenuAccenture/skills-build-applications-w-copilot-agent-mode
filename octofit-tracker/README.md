# OctoFit Tracker

A modern multi-tier fitness tracking application built with React 19 (Vite), Express.js, and MongoDB.

## Architecture

- **Frontend**: React 19 with Vite (Port 5173)
- **Backend**: Express.js with TypeScript (Port 8000)
- **Database**: MongoDB (Port 27017)

## Project Structure

```
octofit-tracker/
├── frontend/          # React 19 + Vite application
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── backend/           # Express.js + TypeScript + MongoDB
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── dist/          # Compiled JavaScript
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- MongoDB (running locally or via Docker)

### Frontend Setup

```bash
cd octofit-tracker/frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

```bash
cd octofit-tracker/backend
npm install
npm run dev
```

The backend will be available at `http://localhost:8000`

### MongoDB Setup

If you don't have MongoDB installed locally, you can run it with Docker:

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Development

- **Frontend**: `npm run dev` to start the development server
- **Backend**: `npm run dev` to start with ts-node (auto-reloads on changes)
- **Backend Build**: `npm run build` to compile TypeScript to JavaScript
- **Backend Production**: `npm start` to run the compiled JavaScript

## API Endpoints

- `GET /api/health` - Health check endpoint

## Environment Variables

Create a `.env` file in the backend directory if needed for configuration.

## License

ISC
