import { config } from 'dotenv';
import { Request, Response } from 'express';
import { responseFlag } from '../../constants/common.constants';
import { successMessage } from '../../constants/success.constants';
import generalResponse from '../../helper/generalResponse.helper';

import { ChangePasswordInterface, ForgotPasswordInterface, LoginInterface, UpdateProfileInterface } from '../../interfaces/auth.interface';
import AuthRepository from '../../repositories/auth/auth.repository';

config()
export class AuthController {
  private authRepository = new AuthRepository();


  public login = async (req: Request, res: Response) => {
    const responseData = await this.authRepository.login(req.body as LoginInterface);
    return generalResponse(req, res, responseData, successMessage.LOGIN_SUCCESS, true, responseFlag.SUCCESS);
  };

  public forgotPassword = async (req: Request, res: Response) => {
    await this.authRepository.forgotPassword(req.body as ForgotPasswordInterface);
    return generalResponse(req, res, {}, successMessage.FORGOT_MAIL_SENT_SUCCESS, true, responseFlag.SUCCESS);
  };

  public checkForgotPasswordToken = async (req: Request, res: Response) => {
    const userId = req.params.userId
    const token = req.params.token   
    await this.authRepository.checkForgotPasswordToken(userId, token);
    return generalResponse(req, res, {}, successMessage.TOKEN_MATCH_SUCCESS, true, responseFlag.SUCCESS);
  };

  public passwordReset = async (req: Request, res: Response) => {
    const userId = req.body.userId
    const token = req.body.token 
    const password = req.body.password   
    await this.authRepository.passwordReset(userId, token, password);
     return generalResponse(req, res, {}, successMessage.PASSWORD_SET_SUCCESS, true, responseFlag.SUCCESS);
  };

  public updateProfile = async (req: Request, res: Response) => {
    req.body.file = req.file
    const userId = req.tokenData.user._id
    await this.authRepository.updateProfile(req.body as UpdateProfileInterface, userId);
    return generalResponse(req, res, {}, successMessage.PROFILE_UPDATE_SUCCESS, true, responseFlag.SUCCESS);
  };

  public changePassword = async (req: Request, res: Response) => {
    const userId = req.tokenData.user._id
    await this.authRepository.changePassword(req.body as ChangePasswordInterface, userId);
    return generalResponse(req, res, {}, successMessage.PASSWORD_CHANGE_SUCCESS, true, responseFlag.SUCCESS);
  };

  public userProfile = async (req: Request, res: Response) => {
    const userId = req.params.id
    const responseData = await this.authRepository.userProfile(userId);
    return generalResponse(req, res, responseData, successMessage.USER_PROFILE_SUCCESS, true, responseFlag.SUCCESS);
  };

  public logout = async (req: Request, res: Response) => {
    const token = req.headers.authorization?req.headers.authorization:'defulttoken'; 
    await this.authRepository.logout(token);
    return generalResponse(req, res, {}, successMessage.LOGOUT_SUCCESS, true, responseFlag.SUCCESS);
  };
}
