import express, { Request, Response } from 'express';
import { requireAuth } from '@davidhume/commoncodev10';
import { Funding } from '../models/funding';

const router = express.Router();

router.get(
  '/api/fundings',
  requireAuth,
  async (req: Request, res: Response) => {
    const fundings = await Funding.find({
      userId: req.currentUser!.id,
    }).populate('dreamticket');

    res.send(fundings);
  }
);

export { router as indexFundingRouter };
