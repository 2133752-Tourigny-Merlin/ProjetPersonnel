import 'dotenv/config';

import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';
import 'express-async-errors';
import BaseRouter from '@src/routes';
import Paths from '@src/common/Paths';
import EnvVars from '@src/common/EnvVars';
import bodyParser from 'body-parser';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import RouteError from '@src/common/RouteError';
import { NodeEnvs } from '@src/common/misc';
import cors from 'cors';
import mongoose from 'mongoose';

// **** Variables **** //
const uri = process.env.MONGODB_URI;
const app = express();

if (!uri) {
  throw new Error('MONGODB_URI is not defined');
}
console.log('MONGODB_URI:', process.env.MONGODB_URI);
mongoose.connect(uri)
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));


// **** Setup **** //
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(EnvVars.CookieProps.Secret));
if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
  app.use(morgan('dev'));
}

// Security
if (EnvVars.NodeEnv === NodeEnvs.Production.valueOf()) {
  app.use(helmet());
}

// Add APIs, must be after middleware
app.use(Paths.Base, BaseRouter);

// Add error handler
app.use((
  err: Error,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (EnvVars.NodeEnv !== NodeEnvs.Test.valueOf()) {
    logger.err(err, true);
  }
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
  }
  return res.status(status).json({ error: err.message });
});


// **** Front-End Content **** //

// Set views directory (html)
const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);

// Set static directory (js and css).
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

// Nav to users pg by default
app.get('/', (_: Request, res: Response) => {
  return res.redirect('/users');
});

// Redirect to login if not logged in.
app.get('/users', (_: Request, res: Response) => {
  return res.sendFile('users.html', { root: viewsDir });
});

// **** Export default **** //

export default app;
