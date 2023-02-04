import express, { Request, Response } from 'express';
import { NotFoundError } from '@davidhume/commoncodev10';
import { Dreamticket } from '../models/dreamticket';

const router = express.Router();

router.get('/api/dreamtickets/:id', async (req: Request, res: Response) => {
  const dreamticket = await Dreamticket.findById(req.params.id);

  if (!dreamticket) {
    throw new NotFoundError();
  }

  res.send(dreamticket);
});

export { router as showDreamticketRouter };
