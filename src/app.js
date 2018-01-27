import express from 'express';
import path from 'path';
import constants from './config/constants';
import './config/database';
import middleware from './config/middleware';
import Routes from './modules';
const app = express();
//Setup Middleware
middleware(app);
//Setup Router
const views = path.join(__dirname , './views');
app.use('/', express.static('src/public'))
app.use('/api', Routes);
//Setup Listening Server
app.listen(constants.PORT, err => {
    if(err) {
        throw err;
    } else {
        console.log(`${process.env.NODE_ENV} nunning with port: ${constants.PORT}`);
    }
});

