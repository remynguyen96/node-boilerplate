import express from 'express';
import { constants } from './config/constants';
import { middleware } from './config/middleware';
import { router } from './modules/posts';

const app = express();
/**
 * @Description: Setup Middleware
 */
middleware(app);
/**
 * @Description: Setup Router
 */
app.use('/api', router);
/**
 * @Description: Setup Listening Server
 */
app.listen(constants.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`${process.env.NODE_ENV} nunning with port: ${constants.PORT}`);
  }
});
