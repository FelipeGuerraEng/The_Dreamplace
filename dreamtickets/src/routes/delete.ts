import express, { Request, Response } from 'express';
import {
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
  BadRequestError,
} from '@davidhume/commoncodev10';
import { Dreamticket } from '../models/dreamticket';

const router = express.Router();

router.delete(
  '/api/dreamtickets/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const dreamticket = await Dreamticket.findById(req.params.id);

    if (!dreamticket) {
      throw new NotFoundError();
    }

    if (dreamticket.fundingId) {
      throw new BadRequestError('Cannot delete a reserved dreamticket');
    }

    if (dreamticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    const result = await dreamticket.deleteOne({ id: dreamticket.id });

    res.status(204).send(result);
  }
);

export { router as deleteDreamticketRouter };
