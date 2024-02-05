import bodyParser from "body-parser";
import cors from 'cors';
import { config } from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import session from 'express-session';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import { UserDocument } from '../src/models/user.model';
import { NODE_ENV } from './config';
import passportConnection from './config/passport';
import dbConnection from './db/connection';
import { errorHandler } from './exceptions/ErrorHandler';
import BaseRouter from './routes';
import fs = require('fs');
const app = express();
config();
dbConnection();
app.use(
  session({
    secret: 'node.js',
    resave: true,
    saveUninitialized: true,
  }),
);

declare global {
  namespace Express {
    interface Request {
      tokenData: {
        user:UserDocument
      };
      fileValidationError:string
    }
  }
}

// passport
// Strategy -> passport.authenticate(...)
app.use(passport.initialize());
app.use(passport.session());
passportConnection(passport);

const port = process.env.PORT ?? 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const corsOpts = { credentials: true, origin: true }
app.use(cors(corsOpts));

//Swagger
const swaggerFile: string = `${process.cwd()}/swagger/index.json`;
const swaggerData: string = fs.readFileSync(swaggerFile, 'utf8');
const swaggerJSON = JSON.parse(swaggerData);
const env: string = NODE_ENV ?? 'development';

function initializeSwagger() {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSON));
}

// routes
app.use('/api', new BaseRouter().buildRoutes());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Error encountered:', err.message || err);
  next(err);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler.handleError(err, res);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
  initializeSwagger();
});
