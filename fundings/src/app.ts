import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from '@davidhume/commoncodev10';

import { deleteFundingRouter } from './routes/delete';
import { indexFundingRouter } from './routes/index';
import { newFundingRouter } from './routes/new';
import { showFundingRouter } from './routes/show';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);
app.use(currentUser);

app.use(deleteFundingRouter);
app.use(indexFundingRouter);
app.use(newFundingRouter);
app.use(showFundingRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
