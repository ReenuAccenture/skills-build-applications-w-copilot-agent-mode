import { Router, Request, Response } from 'express';
import Workout from '../models/Workout';

const router = Router();

// Get all workouts
router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().populate('suggestedFor', '-password');
    res.json({
      message: 'Get all workout suggestions',
      data: workouts,
      count: workouts.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch workouts',
      message: (error as Error).message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Get workout by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findById(id).populate('suggestedFor', '-password');
    if (!workout) {
      return res.status(404).json({
        error: 'Workout not found',
        workoutId: id,
        timestamp: new Date().toISOString(),
      });
    }
    res.json({
      message: `Get workout ${id}`,
      data: workout,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch workout',
      message: (error as Error).message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Get personalized workouts for user
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const workouts = await Workout.find({ suggestedFor: userId } as any).populate('suggestedFor', '-password');
    res.json({
      message: `Get personalized workouts for user ${userId}`,
      userId,
      data: workouts,
      count: workouts.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch personalized workouts',
      message: (error as Error).message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Create new workout
router.post('/', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.create(req.body);
    await workout.populate('suggestedFor', '-password');
    res.status(201).json({
      message: 'Workout created',
      data: workout,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(400).json({
      error: 'Failed to create workout',
      message: (error as Error).message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Update workout
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findByIdAndUpdate(id, req.body, { new: true }).populate('suggestedFor', '-password');
    if (!workout) {
      return res.status(404).json({
        error: 'Workout not found',
        workoutId: id,
        timestamp: new Date().toISOString(),
      });
    }
    res.json({
      message: `Workout ${id} updated`,
      data: workout,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update workout',
      message: (error as Error).message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Delete workout
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) {
      return res.status(404).json({
        error: 'Workout not found',
        workoutId: id,
        timestamp: new Date().toISOString(),
      });
    }
    res.json({
      message: `Workout ${id} deleted`,
      workoutId: id,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to delete workout',
      message: (error as Error).message,
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;
