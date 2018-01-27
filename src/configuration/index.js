import bodyParse from 'koa-bodyparser';
import logger from 'koa-morgan';
import cors from 'koa2-cors';
import responseTime from 'koa-response-time';
import { duration } from 'moment';
import configJSON from './config.json';

export const configDB = (key) => {
  return process.env[key] || configJSON[key];
};

export const configMiddleware = (app) => {
  app.use(cors({
    origin: true,
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: duration(1, 'months').asMilliseconds(),
    credentials: true,
    allowMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
  }));
  app.use(responseTime());
  app.use(logger('combined'));
  app.use(bodyParse());
};
