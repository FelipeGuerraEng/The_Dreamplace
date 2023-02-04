import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@davidhume/commoncodev10';
import { Funding, FundingStatus } from '../models/funding';
import { FundingcanceledPublisher } from '../events/publishers/funding-canceled-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.delete(
  '/api/fundings/:fundingId',
  requireAuth,
  async (req: Request, res: Response) => {
    const { fundingId } = req.params;

    const funding = await Funding.findById(fundingId).populate('dreamticket');

    if (!funding) {
      throw new NotFoundError();
    }
    if (funding.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    funding.status = FundingStatus.canceled;
    await funding.save();

    new FundingcanceledPublisher(natsWrapper.client).publish({
      id: funding.id,
      version: funding.version,
      dreamticket: {
        id: funding.dreamticket.id,
      },
    });

    res.status(204).send(funding);
  }
);

export { router as deleteFundingRouter };
