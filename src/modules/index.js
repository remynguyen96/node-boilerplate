const { Router } = require('express');
const { sendMail, listMailRegister } = require('./users.controller');

const routes = new Router();
routes.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Access-Token, X-Refresh-Token');
  next();
});

routes.post('/send-mail', sendMail);
routes.get('/list-infomation', listMailRegister);

module.exports = routes;

