import { Router, Request, Response } from 'express';
import User from '../models/User';

const router = Router();

// Get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json({
      message: 'Get all users',
      data: users,
      count: users.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch users',
      message: (error as Error).message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Get user by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        userId: id,
        timestamp: new Date().toISOString(),
      });
    }
    res.json({
      message: `Get user ${id}`,
      data: user,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch user',
      message: (error as Error).message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Create new user
router.post('/', async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      message: 'User created',
      data: user,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(400).json({
      error: 'Failed to create user',
      message: (error as Error).message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Update user
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        userId: id,
        timestamp: new Date().toISOString(),
      });
    }
    res.json({
      message: `User ${id} updated`,
      data: user,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update user',
      message: (error as Error).message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Delete user
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        userId: id,
        timestamp: new Date().toISOString(),
      });
    }
    res.json({
      message: `User ${id} deleted`,
      userId: id,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to delete user',
      message: (error as Error).message,
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;
