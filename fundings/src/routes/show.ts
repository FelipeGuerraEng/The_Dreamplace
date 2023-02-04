import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@davidhume/commoncodev10';
import { Funding } from '../models/funding';

const router = express.Router();

router.get(
  '/api/fundings/:fundingId',
  requireAuth,
  async (req: Request, res: Response) => {
    const funding = await Funding.findById(req.params.fundingId).populate(
      'dreamticket'
    );

    if (!funding) {
      throw new NotFoundError();
    }
    if (funding.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    res.send(funding);
  }
);

export { router as showFundingRouter };
