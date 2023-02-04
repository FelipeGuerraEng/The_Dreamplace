import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  FundingStatus,
  BadRequestError,
} from '@davidhume/commoncodev10';
import { body } from 'express-validator';
import { Dreamticket } from '../models/dreamticket';
import { Funding } from '../models/funding';
import { FundingCreatedPublisher } from '../events/publishers/funding-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 1 * 60;

router.post(
  '/api/fundings',
  requireAuth,
  [
    body('dreamticketId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('DreamticketId must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { dreamticketId } = req.body;

    const dreamticket = await Dreamticket.findById(dreamticketId);
    if (!dreamticket) {
      throw new NotFoundError();
    }

    const isReserved = await dreamticket.isReserved();
    if (isReserved) {
      throw new BadRequestError('Dreamticket is already reserved');
    }

    const timeout = new Date();
    timeout.setSeconds(timeout.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    const funding = Funding.build({
      userId: req.currentUser!.id,
      status: FundingStatus.Created,
      expiresAt: timeout,
      dreamticket,
    });
    await funding.save();

    new FundingCreatedPublisher(natsWrapper.client).publish({
      id: funding.id,
      version: funding.version,
      status: funding.status,
      userId: funding.userId,
      expiresAt: funding.expiresAt.toISOString(),
      dreamticket: {
        id: dreamticket.id,
        price: dreamticket.price,
      },
    });

    res.status(201).send(funding);
  }
);

export { router as newFundingRouter };
