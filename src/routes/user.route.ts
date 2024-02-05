import express, { NextFunction, Request, Response } from 'express';
import { UserController } from '../controllers/user/user.controller';
import RouterUtils from '../utils/routerUtils';

export default class UserRouter {
  private router: express.Router;
  public userController = new UserController();

  public constructor() {
    this.router = express.Router();
  }

  public buildRoutes(): express.Router {
    this.buildRouteListUser(); // This Function is used for calling api for list of users
    return this.router;
  }

  private buildRouteListUser(): void {
    this.router.get(`/user/create`, (req: Request, res: Response, next: NextFunction) => {
      RouterUtils.handleRestServerAction(new UserController().createUser.bind, req, res, next);
    });
  }
  // private buildRouteListUser() {
  //   // register route
  //   this.router.route('/create').get(this.userController.createUser);
  // }
}
