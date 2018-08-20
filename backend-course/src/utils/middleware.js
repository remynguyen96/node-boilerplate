const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const winston = require('../config/winston');

module.exports = (app) => {
  app.use(morgan('combined', { stream: winston.stream }));
  app.use(cors('*'));
  app.use(compression());
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
};
