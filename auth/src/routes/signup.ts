import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError } from '@davidhume/commoncodev10';

import { User } from '../models/user';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('userName')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('User name must be between 4 and 20 characters'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { userName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    const existingName = await User.findOne({ userName });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }
    if (existingName) {
      throw new BadRequestError('User name already in use');
    }

    const user = User.build({ userName, email, password });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        userName: user.userName,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
