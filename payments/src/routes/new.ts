import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  FundingStatus,
} from '@davidhume/commoncodev10';
import { stripe } from '../stripe';
import { Funding } from '../models/funding';
import { Payment } from '../models/payment';
import { PaymentCreatedPublisher } from '../events/publishers/payment-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post(
  '/api/payments',
  requireAuth,
  [body('token').not().isEmpty(), body('fundingId').not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, fundingId } = req.body;

    const funding = await Funding.findById(fundingId);

    if (!funding) {
      throw new NotFoundError();
    }
    if (funding.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    if (funding.status === FundingStatus.canceled) {
      throw new BadRequestError('Cannot pay for an canceled funding');
    }

    const charge = await stripe.charges.create({
      currency: 'usd',
      amount: funding.price * 100,
      source: token,
    });
    const payment = Payment.build({
      fundingId,
      stripeId: charge.id,
    });
    await payment.save();
    new PaymentCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,
      fundingId: payment.fundingId,
      stripeId: payment.stripeId,
    });

    res.status(201).send({ id: payment.id });
  }
);

export { router as createChargeRouter };
