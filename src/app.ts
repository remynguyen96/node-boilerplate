import express from 'express';
import { constants } from './config/constants';
import middleware from './config/middleware';
import { routes } from './modules';
const app = express();
/**
 * *Description: Setup Middleware
 */
middleware(app);
/**
 * *Description: Setup Router
 */
app.use('/api', routes);
/**
 * *Description: Setup Listening Server
 */
app.listen(constants.PORT, (err: any) => {
  if (err) {
    throw err;
  } else {
    console.log(`${process.env.NODE_ENV} nunning with port: ${constants.PORT}`);
  }
});
