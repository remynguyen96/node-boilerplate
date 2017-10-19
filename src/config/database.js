import mongoose from 'mongoose';
import constants from './constants';

mongoose.Promise = global.Promise;
mongoose.set('debug', true);

try {
    mongoose.connect(constants.MONGO_URL, {
        useMongoClient: true,
    });
} catch (err) {
    mongoose.createConnection(constants.MONGO_URL, {
        useMongoClient: true,
    });
}

mongoose.connection
    .once('open', () => console.log('MongoDB Running'))
    .on('error', e => {
        throw e;
    });
