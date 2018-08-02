import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';

export const middleware = (app) => {
  app.use(morgan('dev'));
  app.use(cors());
  app.use(compression());
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
}
