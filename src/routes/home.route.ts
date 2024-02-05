import express from "express";
import { HomeController } from "../controllers/home/home.controller";

export default class HomeRouter {
  private router: express.Router;
  private homeController = new HomeController();
  
  public constructor() {
    this.router = express.Router();
  }

  public buildRoutes(): express.Router {
    this.buildRouteListUser(); // This Function is used for calling api for list of users
    return this.router;
  }

  private buildRouteListUser() {
    // register route    
    this.router.route('/').get(this.homeController.createCalendarEvent);
  }
}
