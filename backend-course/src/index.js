import express from 'express';
import path from 'path';
import passport from 'passport';
import { constants } from './config/constants';
import mysql from './config/mysql';
import middleware from './utils/middleware';
import Routes from './modules';
/**
 * @Description: Setup Middleware
 */
const app = express();
middleware(app);
app.use(passport.initialize());
/**
 * @Description: Setup Router Backend
 */
app.use('/api', Routes);
/**
 * @Description: Setup Router Frontend
 */
const views = path.join(__dirname, 'views');
app.use('/', express.static(views));
/**
 * @Description: Setup Listening Server
 */
mysql.sequelize.sync({ force: false })
  .then(() => {
    app.listen(constants.PORT, (err) => {
      if (err) {
        throw err;
      } else {
        console.log('Database Connection Has Been Established Successfully. !');
        console.log(`${process.env.NODE_ENV} running with port: ${constants.PORT}`);
      }
    });
  })
  .catch((err) => console.error('Unable to connect to the database:', err));
