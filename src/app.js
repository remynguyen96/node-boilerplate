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
import fakerModels, {UserFaker} from './models/faker';

promise.polyfill();
const app = express();``
/**
 * @Description: Setup Middleware
 */
middleware(app);
/**
 * @Description: GraphQL
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


models.sequelize.sync()
    .then(() => {
        // models.sequelize.drop();
        console.log('Mysql connection has been established !');
        fakerModels();
        // fakerModels().then((fakeData) => {
            // for(let i =1 ; i <= 10; i++) {
            //     UserFaker().then();
            // }
            app.listen(constants.PORT, err => {
                if (err) {
                    throw err;
                } else {
                    console.log(`${process.env.NODE_ENV} nunning with port: ${constants.PORT}`);
                }
            });
        // });
    })
    .catch(err => console.error('Unable to connect to the database:', err));
