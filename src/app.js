import express from 'express';
import http from 'http';
import path from 'path';
import passport from 'passport';
import constants from './config/constants';
import mysql from './config/mysql';
import middleware from './utils/middleware';
import Routes from './modules';
// import fakerModels from './utils/faker';
// import './basic';
const app = express();
/**
 * @Description: Setup Middleware
 */
middleware(app);
app.use(passport.initialize());
/**
 * @Description: GraphQLd
 */
// GraphQL(app);
/**
 * @Description: Setup Router
 */
const views = path.join(__dirname, './views/');
app.use('/', express.static('src/public'));
app.use('/api', Routes);
app.get('/page', (req, res) => res.sendFile(`${views}page.html`));
/**
 * @Description: Setup Listening Server
 */

http.createServer((req, res) => {
    res.end('good');
}).listen(5000);

mysql.sequelize.sync({ force: false })
    .then(async () => {
        console.log('Database Connection Has Been Established Successfully. !');
        app.listen(constants.PORT, (err) => {
            if (err) {
                throw err;
            } else {
                console.log(`${process.env.NODE_ENV} running with port: ${constants.PORT}`);
            }
        });
        // await fakerModels();
    })
    .catch((err) => console.error('Unable to connect to the database:', err));
