import express from 'express';
import { constants } from '../config/constants';
import mysql from '../config/mysql';
import { deleteData, seedsData } from './faker';

const app = express();
mysql.sequelize.sync({ force: true })
  .then(async () => {
    app.listen(constants.PORT, (err) => {
      if (err) {
        throw err;
      } else {
        console.log('Migrate data successful !');
      }
    });
    await deleteData();
    await seedsData();
  })
  .catch((err) => console.error('Unable to connect to the database:', err));
