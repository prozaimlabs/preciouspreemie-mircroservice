import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, NotFoundError, currentUser } from '@prozaimlabs/common';

import cookieSession from 'cookie-session';
import { CreateChargeRouter } from './routes/new';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test',
    })
);

app.use(currentUser);

app.use(CreateChargeRouter);

app.all('*', async (request, response) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
