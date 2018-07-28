import express from 'express';
import constants from './config/constants';
import './config/database';
import middleware from './config/middleware';
import Routes from './modules';

const app = express();
//Setup Middleware
middleware(app);
//Setup Router
app.use('/api', Routes);
//Setup Listening Server
app.listen(constants.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`${process.env.NODE_ENV} nunning with port: ${constants.PORT}`);
  }
});

