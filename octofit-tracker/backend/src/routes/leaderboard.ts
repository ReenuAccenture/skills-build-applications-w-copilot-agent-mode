import { Router, Request, Response } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

// Get global leaderboard
router.get('/', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find({ team: null } as any)
      .sort({ points: -1 })
      .populate('user', '-password');
    res.json({
      message: 'Get global leaderboard',
      data: leaderboard,
      count: leaderboard.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch leaderboard',
      message: (error as Error).message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Get leaderboard by team
router.get('/team/:teamId', async (req: Request, res: Response) => {
  try {
    const { teamId } = req.params;
    const leaderboard = await Leaderboard.find({ team: teamId } as any)
      .sort({ points: -1 })
      .populate('user', '-password');
    res.json({
      message: `Get leaderboard for team ${teamId}`,
      teamId,
      data: leaderboard,
      count: leaderboard.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch team leaderboard',
      message: (error as Error).message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Get user rank
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userRank = await Leaderboard.findOne({ user: userId } as any).populate('user', '-password');
    if (!userRank) {
      return res.status(404).json({
        error: 'User rank not found',
        userId,
        timestamp: new Date().toISOString(),
      });
    }
    res.json({
      message: `Get rank for user ${userId}`,
      data: userRank,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch user rank',
      message: (error as Error).message,
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;
