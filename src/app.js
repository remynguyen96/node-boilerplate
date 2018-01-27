import Koa from 'koa';
import http from 'http';
import database from './database';
import { configMiddleware } from './configuration';
import UsersController from './controllers/UsersController';

const app = new Koa();

configMiddleware(app);
const { router: usersRouter } = new UsersController();
app.use(usersRouter.routes());
app.use(ctx => ctx.type = 'json');
(async () => {
  try {
    const runDB = await database();
    http.createServer(app.callback()).listen(3500, () => {
      console.log(`${process.env.NODE_ENV} with ${runDB} running with port: 3500`);
    });
  } catch (err) {
    console.log('Something went wrong', err);
  }
})();

// https://www.youtube.com/watch?v=O_skUSGDbfM&list=PLfiFyFs7K9sw_8vM_9fDPJrGO2YTm1yR0&index=40
// https://github.com/mcmath/deep-map-keys
// http://mongoosejs.com/docs/models.html
// https://github.com/buunguyen/route-decorators
// https://github.com/projekt-matara/koa-demo/blob/master/app.js
// https://codeburst.io/building-simple-point-of-sale-system-with-node-js-react-js-a0e51059ba33
// https://www.dailydrip.com/blog/build-an-api-with-koa-js.html
