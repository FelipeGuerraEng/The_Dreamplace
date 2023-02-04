import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@davidhume/commoncodev10';
import { Dreamticket } from '../models/dreamticket';
import { DreamticketCreatedPublisher } from '../events/publishers/dreamticket-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post(
  '/api/dreamtickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const dreamticket = Dreamticket.build({
      title,
      price,
      userId: req.currentUser!.id,
      userName: req.currentUser!.userName,
    });
    await dreamticket.save();
    new DreamticketCreatedPublisher(natsWrapper.client).publish({
      id: dreamticket.id,
      title: dreamticket.title,
      price: dreamticket.price,
      userId: dreamticket.userId,
      userName: dreamticket.userName,
      version: dreamticket.version,
    });

    res.status(201).send(dreamticket);
  }
);

export { router as createDreamticketRouter };
