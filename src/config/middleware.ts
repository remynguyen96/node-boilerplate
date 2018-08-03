import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as compression from 'compression';
import * as helmet from 'helmet';

export default (app: any) => {
  app.use(morgan('dev'));
  app.use(cors());
  app.use(compression());
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
}