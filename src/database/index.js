import mongoose from 'mongoose';
import { configDB } from '../configuration';

mongoose.Promise = global.Promise;
mongoose.set('debug', true);
const url = configDB('MONGO_URL');

export default () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(url);
    mongoose.connection
      .once('open', () => {
        resolve('mongoDB');
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};
