const express = require('express');
const { constants } = require('../config/constants');
const mysql = require('../config/mysql');
const { seedsData } = require('./faker');

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
