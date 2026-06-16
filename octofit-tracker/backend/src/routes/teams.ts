import { Router, Request, Response } from 'express';
import Team from '../models/Team';

const router = Router();

// Get all teams
router.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate('owner members');
    res.json({
      message: 'Get all teams',
      data: teams,
      count: teams.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch teams',
      message: (error as Error).message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Get team by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id).populate('owner members');
    if (!team) {
      return res.status(404).json({
        error: 'Team not found',
        teamId: id,
        timestamp: new Date().toISOString(),
      });
    }
    res.json({
      message: `Get team ${id}`,
      data: team,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch team',
      message: (error as Error).message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Create new team
router.post('/', async (req: Request, res: Response) => {
  try {
    const team = await Team.create(req.body);
    await team.populate('owner members');
    res.status(201).json({
      message: 'Team created',
      data: team,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(400).json({
      error: 'Failed to create team',
      message: (error as Error).message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Update team
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findByIdAndUpdate(id, req.body, { new: true }).populate('owner members');
    if (!team) {
      return res.status(404).json({
        error: 'Team not found',
        teamId: id,
        timestamp: new Date().toISOString(),
      });
    }
    res.json({
      message: `Team ${id} updated`,
      data: team,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update team',
      message: (error as Error).message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Delete team
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findByIdAndDelete(id);
    if (!team) {
      return res.status(404).json({
        error: 'Team not found',
        teamId: id,
        timestamp: new Date().toISOString(),
      });
    }
    res.json({
      message: `Team ${id} deleted`,
      teamId: id,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to delete team',
      message: (error as Error).message,
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;
