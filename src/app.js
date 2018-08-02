import express from 'express';
import path from 'path';
import constants from './config/constants';
import './config/database';
import { createServer } from 'http';
import middleware from './config/middleware';
import Routes from './modules';
import GraphQL from './graphql';
import promise from 'es6-promise';
import 'isomorphic-fetch';
promise.polyfill();

const startServer = async () => {
    const app = express();
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
    const graphQLServer = createServer(app);
    graphQLServer.listen(constants.PORT, err => {
        if (err) {
            throw err;
        } else {
            console.log(`${process.env.NODE_ENV} nunning with port: ${constants.PORT}`);
        }
    });
};
startServer();




