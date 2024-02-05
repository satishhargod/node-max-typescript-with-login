import express from 'express';
import AuthRouter from './auth.route';
import HomeRouter from './home.route';
import UserRouter from './user.route';

export default class BaseRouter {
  private router: express.Router;

  public constructor() {
    this.router = express.Router();
  }

  public buildRoutes(): express.Router {
    this.buildRouteAPI();
    return this.router;
  }
  protected buildRouteAPI(): void {
    this.router.use('/images', express.static('uploads'));
    this.router.use('/user', [new UserRouter().buildRoutes()]);
    this.router.use('/auth', [new AuthRouter().buildRoutes()]);
    this.router.use('/home', [new HomeRouter().buildRoutes()]);
  }
}
