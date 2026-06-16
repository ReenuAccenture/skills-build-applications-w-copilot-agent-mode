import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { config, getApiUrl } from './config';

// Import route handlers
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const app = express();

// Middleware
app.use(express.json());

// Enable CORS headers (for Codespaces and local development)
app.use((req: Request, res: Response, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// MongoDB Connection
mongoose
  .connect(config.mongodbUri)
  .then(() => {
    console.log(`Connected to MongoDB at ${config.mongodbUri}`);
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'Server is running',
    apiUrl: getApiUrl(),
    port: config.port,
    isDevelopment: config.isDevelopment,
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'OctoFit Tracker API',
    version: '1.0.0',
    apiUrl: getApiUrl(),
    endpoints: {
      health: '/api/health',
      users: '/api/users',
      teams: '/api/teams',
      activities: '/api/activities',
      leaderboard: '/api/leaderboard',
      workouts: '/api/workouts',
    },
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} does not exist`,
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(config.port, () => {
  console.log(`
╔════════════════════════════════════════╗
║    OctoFit Tracker Backend Server      ║
╚════════════════════════════════════════╝

API URL: ${getApiUrl()}
Port: ${config.port}
Environment: ${config.isDevelopment ? 'development' : 'production'}
MongoDB: ${config.mongodbUri}

Available endpoints:
  GET  /
  GET  /api/health
  GET  /api/users
  POST /api/users
  GET  /api/teams
  POST /api/teams
  GET  /api/activities
  POST /api/activities
  GET  /api/leaderboard
  GET  /api/workouts
  POST /api/workouts

Ready to accept requests! 🚀
  `);
});
