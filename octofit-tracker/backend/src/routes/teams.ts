import { Router, Request, Response } from 'express';

const router = Router();

// Get all teams
router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Get all teams',
    data: [],
    timestamp: new Date().toISOString(),
  });
});

// Get team by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Get team ${id}`,
    teamId: id,
    timestamp: new Date().toISOString(),
  });
});

// Create new team
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({
    message: 'Team created',
    data: req.body,
    timestamp: new Date().toISOString(),
  });
});

// Update team
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Team ${id} updated`,
    teamId: id,
    data: req.body,
    timestamp: new Date().toISOString(),
  });
});

// Delete team
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Team ${id} deleted`,
    teamId: id,
    timestamp: new Date().toISOString(),
  });
});

export default router;
