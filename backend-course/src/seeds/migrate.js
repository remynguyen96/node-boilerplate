const express = require('express');
const { constants } = require('../config/constants');
const mysql = require('../config/mysql');
const { seedsData } = require('./faker');
const logger = require('../config/winston');


const app = express();

mysql.sequelize.sync({ force: true })
  .then(async () => {
    await seedsData();
    app.listen(constants.PORT, (err) => {
      if (err) {
        throw err;
      } else {
        logger.log('info', 'Migrate data successful !');
        // process.exit();
      }
    });
  })
  .catch((error) => logger.log('error', 'Unable to connect to the database:', { error }));
