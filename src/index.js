require('dotenv').config();
const express = require('express');
const path = require('path');
const middleware = require('./utils/middleware');
const Routes = require('./modules');
/**
 * *Description: Setup Middleware
 */
const app = express();
const { log } = console;
middleware(app);
/**
 @Description: Setup Router Backend
 */
app.use('/api', Routes);
const views = path.join(__dirname, 'views');
app.use('/', express.static(views));
/**
 * *Description: Setup Listening Server
 */
app.listen(process.env.PORT || process.env.WEB_PORT, (err) => {
  if (err) {
    throw err;
  } else {
    log(`Environment ${process.env.NODE_ENV} running with port: ${process.env.WEB_PORT}`);
  }
});
