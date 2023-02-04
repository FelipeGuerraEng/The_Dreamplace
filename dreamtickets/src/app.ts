import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from '@davidhume/commoncodev10';
import { createDreamticketRouter } from './routes/new';
import { showDreamticketRouter } from './routes/show';
import { indexDreamticketRouter } from './routes/index';
import { updateDreamticketRouter } from './routes/update';
import { deleteDreamticketRouter } from './routes/delete';

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

app.use(createDreamticketRouter);
app.use(showDreamticketRouter);
app.use(indexDreamticketRouter);
app.use(updateDreamticketRouter);
app.use(deleteDreamticketRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
