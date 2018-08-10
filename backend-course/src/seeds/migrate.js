import express from 'express';
import { constants } from '../config/constants';
import mysql from '../config/mysql';
import { seedsData } from './faker';

const app = express();

mysql.sequelize.sync({ force: true })
  .then(async () => {
    await seedsData();
    app.listen(constants.PORT, (err) => {
      if (err) {
        throw err;
      } else {
        console.log('Migrate data successful !');
      }
    });
  })
  .catch((err) => console.error('Unable to connect to the database:', err));
