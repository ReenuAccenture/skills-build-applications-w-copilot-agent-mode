import { Router, Request, Response } from 'express';

const router = Router();

// Get all activities
router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Get all activities',
    data: [],
    timestamp: new Date().toISOString(),
  });
});

// Get activity by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Get activity ${id}`,
    activityId: id,
    timestamp: new Date().toISOString(),
  });
});

// Log new activity
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({
    message: 'Activity logged',
    data: req.body,
    timestamp: new Date().toISOString(),
  });
});

// Update activity
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Activity ${id} updated`,
    activityId: id,
    data: req.body,
    timestamp: new Date().toISOString(),
  });
});

// Delete activity
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Activity ${id} deleted`,
    activityId: id,
    timestamp: new Date().toISOString(),
  });
});

export default router;
