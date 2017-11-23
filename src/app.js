import express from 'express';
import path from 'path';
import constants from './config/constants';
import './config/database';
import middleware from './config/middleware';
import Routes from './modules';
const app = express();
/**
 * @Description: Fetch Api
 */
import promise from 'es6-promise'
promise.polyfill();
import 'isomorphic-fetch';
/**
 * @Description: Graphql
 */
// import graphql from './graphql';
// graphql(app);
/**
 * @Description: Setup Middleware
 */
middleware(app);
/**
 * @Description: Setup Router
 */
const views = path.join(__dirname , './views/');
app.use('/', express.static('src/public'));
app.use('/api', Routes);
app.get('/page', (req, res) => {
    return res.sendFile(views + 'page.html');
});
/**
 * @Description: Setup Listening Server
 */
app.listen(constants.PORT, err => {
    if(err) {
        throw err;
    } else {
        console.log(`${process.env.NODE_ENV} nunning with port: ${constants.PORT}`);
    }
});

