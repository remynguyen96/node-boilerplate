import express from 'express';
import path from 'path';
import constants from './config/constants';
import mysql from './config/mysql';
import middleware from './config/middleware';
import Routes from './modules';
// import fakerModels from './config/faker';
// import GraphQL from './graphql';
const app = express();
/**
 * @Description: Setup Middleware
 */
middleware(app);
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
// fakerModels().then(() => {
    mysql.sequelize.sync({force: false})
        .then(() => {
            console.log('Mysql Connection has been established successfully. !');
            app.listen(constants.PORT, (err) => {
                if (err) {
                    throw err;
                } else {
                    console.log(`${process.env.NODE_ENV} nunning with port: ${constants.PORT}`);
                }
            });
        })
        .catch((err) => console.error('Unable to connect to the database:', err));
// });

