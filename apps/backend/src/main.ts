import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import appRouter from './routes';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { getEnv } from './helpers/system';
import logger from './helpers/logger';
import LocalUserModel from './db/local-user';
import socket from './integrations/socket';
import { attachSocket } from './middlewares/utils/response';
import { createServer } from 'http';

dotenv.config();

const app: Express = express();
const server = createServer(app);
const DEFAULT_PORT = 3000;
const port = process.env.PORT || DEFAULT_PORT;

// integrate socket
const io = socket(server);
app.use((_: Request, res: Response, next: NextFunction) => {
  attachSocket(res, io);
  next();
});

// connect mongodb
connect(getEnv('APP_MONGODB_URI')).catch(err => {
  logger.info('🛑 DBG::Mongodb Can not connect to DB', err.message);
  process.exit(1);
});

// Configure passport-local to use local user model for authentication
passport.use(new LocalStrategy({ session: false, usernameField: 'email' }, LocalUserModel.authenticate()));

passport.serializeUser(LocalUserModel.serializeUser() as never);
passport.deserializeUser(LocalUserModel.deserializeUser());

app.use(cors());
app.use(express.json());

app.get('/ver', (req: Request, res: Response) => {
  res.json({ build: process.env.BUILD_NUMBER, at: process.env.BUILD_DATE, version: process.env.BUILD_VERSION });
});

app.use('/', appRouter);

app.use((err: Error & { status?: number }, request: Request, res: Response, next: NextFunction) => {
  logger.error(err, `🔴 Exception error: ${request.originalUrl}`);
  const SERVER_ERROR_CODE = 500;
  const status = err.status || SERVER_ERROR_CODE;

  res.status(status).json({ error: err.message || 'Internal server error.' });
  next();
});

server.listen(port, () => {
  logger.info(`✅ [server]: Server is running at http://localhost:${port}`);
});

process.on('unhandledRejection', err => {
  logger.error('🛑 DBG::Unhandled Rejection at: %o', err);
});

process.on('uncaughtException', err => {
  logger.error('🛑 DBG::Uncaught Exception thrown %o', err.message);
});
