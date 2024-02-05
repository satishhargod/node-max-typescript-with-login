import express from 'express';
import { AuthController } from '../controllers/auth/auth.controller';
import authMiddleware from '../middlewares/auth.middleware';
import upload from '../middlewares/multer.middleware';
import validationMiddleware from '../middlewares/validation.middleware';
import { changePasswordSchema, forgotPasswordSchema, loginSchema, resetPasswordSchema, updateProfileSchema } from '../validations/auth.validation';
export default class AuthRouter {
  private router: express.Router;
  public authController = new AuthController();

  public constructor() {
    this.router = express.Router();
  }

  public buildRoutes(): express.Router {
    this.buildRouteListUser(); // This Function is used for calling api for list of users
    return this.router;
  }

  private buildRouteListUser() {
    this.router.route('/login').post(validationMiddleware(loginSchema, 'body'), this.authController.login);
    this.router
      .route('/forgot-password')
      .post(validationMiddleware(forgotPasswordSchema, 'body'), this.authController.forgotPassword);
    this.router.route('/check-forgot-password-token/:userId/:token').get(this.authController.checkForgotPasswordToken);
    this.router.route('/password-reset').post(validationMiddleware(resetPasswordSchema, 'body'), this.authController.passwordReset);
    this.router.route('/update-profile').post(authMiddleware, validationMiddleware(updateProfileSchema, 'body'), upload.single('file'), this.authController.updateProfile);
    this.router.route('/change-password').post(authMiddleware, validationMiddleware(changePasswordSchema, 'body'), this.authController.changePassword);
    this.router.route('/user-profile/:id').get(this.authController.userProfile);
    this.router.route('/logout').get(authMiddleware, this.authController.logout);
  }
}
