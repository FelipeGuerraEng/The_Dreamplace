import express, { Request, Response } from 'express';
import { Dreamticket } from '../models/dreamticket';

const router = express.Router();

router.get('/api/dreamtickets', async (req: Request, res: Response) => {
  const dreamtickets = await Dreamticket.find({});

  res.send(dreamtickets);
});

export { router as indexDreamticketRouter };
