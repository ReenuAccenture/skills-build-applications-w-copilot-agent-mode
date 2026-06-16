import { Router, Request, Response } from 'express';

const router = Router();

// Get all users
router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Get all users',
    data: [],
    timestamp: new Date().toISOString(),
  });
});

// Get user by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Get user ${id}`,
    userId: id,
    timestamp: new Date().toISOString(),
  });
});

// Create new user
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({
    message: 'User created',
    data: req.body,
    timestamp: new Date().toISOString(),
  });
});

// Update user
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `User ${id} updated`,
    userId: id,
    data: req.body,
    timestamp: new Date().toISOString(),
  });
});

// Delete user
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `User ${id} deleted`,
    userId: id,
    timestamp: new Date().toISOString(),
  });
});

export default router;
