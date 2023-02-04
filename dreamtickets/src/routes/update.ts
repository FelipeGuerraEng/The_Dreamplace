import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
  BadRequestError,
} from '@davidhume/commoncodev10';
import { Dreamticket } from '../models/dreamticket';
import { DreamticketUpdatedPublisher } from '../events/publishers/dreamticket-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put(
  '/api/dreamtickets/:id',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be provided and must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const dreamticket = await Dreamticket.findById(req.params.id);

    if (!dreamticket) {
      throw new NotFoundError();
    }

    if (dreamticket.fundingId) {
      throw new BadRequestError('Cannot edit a reserved dreamticket');
    }

    if (dreamticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    dreamticket.set({
      title: req.body.title,
      price: req.body.price,
    });
    await dreamticket.save();
    new DreamticketUpdatedPublisher(natsWrapper.client).publish({
      id: dreamticket.id,
      title: dreamticket.title,
      price: dreamticket.price,
      userId: dreamticket.userId,
      userName: dreamticket.userName,
      version: dreamticket.version,
    });

    res.send(dreamticket);
  }
);

export { router as updateDreamticketRouter };
