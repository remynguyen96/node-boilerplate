import express from 'express';
import path from 'path';
import constants from './config/constants';
// import './config/database-mongo';
import models from './models/index';
import middleware from './config/middleware';
import Routes from './modules';
import GraphQL from './graphql';
import promise from 'es6-promise';
import 'isomorphic-fetch';
import fakerModels from './models/faker';

promise.polyfill();
const app = express();
/**
 * @Description: Setup Middleware
 */
middleware(app);
/**
 * @Description: GraphQLd
 */
GraphQL(app);
/**
 * @Description: Setup Router
 */
const views = path.join(__dirname, './views/');
app.use('/', express.static('src/public'));
app.use('/api', Routes);
app.get('/page', (req, res) => {
    return res.sendFile(views + 'page.html');
});
/**
 * @Description: Setup Listening Server
 */
// fakerModels().then(() => {
    models.sequelize.sync({force: false})
        .then(() => {
            console.log('Mysql connection has been established !');
            app.listen(constants.PORT, err => {
                if (err) {
                    throw err;
                } else {
                    console.log(`${process.env.NODE_ENV} nunning with port: ${constants.PORT}`);
                }
            });
        })
        .catch(err => console.error('Unable to connect to the database:', err));
// });

