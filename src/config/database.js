import mongoose from 'mongoose';
import { constants } from './constants';

mongoose.Promise = global.Promise;
mongoose.set('debug', true);

const options = {
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 250, // Reconnect every 250ms
  poolSize: 4, // Maintain up to 4 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 30000, // Close sockets after 30 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  useNewUrlParser: true,
  dbName: 'boilerplate'
};
try {
  mongoose.connect(constants.MONGO_URL, options);
} catch (err) {
  console.log(err, 'error connect Mongodb !');
  mongoose.createConnection(constants.MONGO_URL, options);
}

mongoose.connection
  .once('open', () => console.log('MongoDB Running'))
  .on('error', e => {
    throw e;
  });
