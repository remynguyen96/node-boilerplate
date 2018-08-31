require('dotenv').config();
const express = require('express');
const mysql = require('../config/mysql');
const { seedsData, deleteData } = require('./faker');
const logger = require('../config/winston');

const app = express();
mysql.sequelize.sync({ force: true })
  .then(async () => {
    await deleteData();
    await seedsData();
    app.listen(process.env.PORT || process.env.WEB_PORT, (err) => {
      if (err) {
        throw err;
      } else {
        logger.log('info', 'Migrate data successful !');
        // process.exit();
      }
    });
  })
  .catch((error) => logger.log('error', 'Unable to connect to the database:', { error }));