import { Router, Request, Response } from 'express';
import Activity from '../models/Activity';

const router = Router();

// Get all activities
router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('user');
    res.json({
      message: 'Get all activities',
      data: activities,
      count: activities.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch activities',
      message: (error as Error).message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Get activity by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id).populate('user');
    if (!activity) {
      return res.status(404).json({
        error: 'Activity not found',
        activityId: id,
        timestamp: new Date().toISOString(),
      });
    }
    res.json({
      message: `Get activity ${id}`,
      data: activity,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch activity',
      message: (error as Error).message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Log new activity
router.post('/', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.create(req.body);
    await activity.populate('user');
    res.status(201).json({
      message: 'Activity logged',
      data: activity,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(400).json({
      error: 'Failed to log activity',
      message: (error as Error).message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Update activity
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByIdAndUpdate(id, req.body, { new: true }).populate('user');
    if (!activity) {
      return res.status(404).json({
        error: 'Activity not found',
        activityId: id,
        timestamp: new Date().toISOString(),
      });
    }
    res.json({
      message: `Activity ${id} updated`,
      data: activity,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update activity',
      message: (error as Error).message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Delete activity
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByIdAndDelete(id);
    if (!activity) {
      return res.status(404).json({
        error: 'Activity not found',
        activityId: id,
        timestamp: new Date().toISOString(),
      });
    }
    res.json({
      message: `Activity ${id} deleted`,
      activityId: id,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to delete activity',
      message: (error as Error).message,
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;
