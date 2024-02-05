import * as bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { addToBlacklist } from '../../common/tokenBlacklist';
import { BASE_URL, SECRET_KEY, SMTP_MAIL_USERNAME } from '../../config';
import { mailSubject } from '../../constants/common.constants';
import { errorMessage } from '../../constants/error.constants';
import { AppError, HttpCode } from '../../exceptions/AppError';
import NodeMailerService from '../../helper/mail/nodemailer';
import {
  ChangePasswordInterface,
  ForgotPasswordInterface,
  LoginInterface,
  PasswordInterface,
  UpdateProfileInterface
} from '../../interfaces/auth.interface';
import { Role, Token, User, UserDocument, UserRole } from '../../models';
import EmailRepository from '../../repositories/email/email.repository';
import { parse } from '../../utils';
import BaseRepository from '../base.repository';
export default class AuthRepository extends BaseRepository<UserDocument, typeof User> {
  private nodeService = new NodeMailerService();
  private emailRepo = new EmailRepository();

  constructor() {
    super('User', User);
  }

  readonly createToken = (user: any) => {
    const AUTH_SECRET_KEY: string = SECRET_KEY ?? '26PHem9AhJZ';
    return jwt.sign({ email: user.email, userId: user.id }, AUTH_SECRET_KEY, { expiresIn: '1d' });
  };

  public checkPassword = async (data: PasswordInterface, user: any) => {
    if (!user.password) throw new AppError({ httpCode: HttpCode.BAD_REQUEST, description: errorMessage.PASSWORD_NOT_MATCH });
    const isMatch = await bcrypt.compare(data.password, parse(user).password);
    if (isMatch) return true;
    else throw new AppError({ httpCode: HttpCode.BAD_REQUEST, description: errorMessage.PASSWORD_NOT_MATCH });
  };

  public login = async (data: LoginInterface) => {
    const { email } = data;
    const user = await this.findOne({email:email});
    if (user) {
      // NOSONAR
      // if (parse(user)?.role.name === RoleEnum.Admin) {
      //   await this.userRepository.update({ verified: true }, { where: { id: parse(user).id } });
      // }
      const passwordCheck = await this.checkPassword(data, user);
      if (passwordCheck) {
        return {
          user: user,
          access_token: this.createToken(user),
        };
      }
    } else throw new AppError({ httpCode: HttpCode.BAD_REQUEST, description: errorMessage.EMAIL_NOT_FOUND });
  };

  public changePassword = async (data: ChangePasswordInterface, userId: string) => {
    const { newpassword, oldpassword } = data;
    const user = await this.findOne({ _id: userId });
    if (user) {
      const passworddata = {
        password: oldpassword,
      };
      const passwordCheck = await this.checkPassword(passworddata, user);
      if (passwordCheck) {
        user.password = newpassword;
        user.save();
      }
    } else throw new AppError({ httpCode: HttpCode.BAD_REQUEST, description: errorMessage.EMAIL_NOT_FOUND });
  };

  public forgotPassword = async (data: ForgotPasswordInterface) => {
    const { email } = data;
    const user = await this.findOne({ email: email });
    if (!user) throw new AppError({ httpCode: HttpCode.BAD_REQUEST, description: errorMessage.EMAIL_NOT_FOUND });

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString('hex'),
      }).save();
    }

    const link = `${BASE_URL}resetPassword/${user._id}/${token.token}`;

    const files = null;
    const nodeMailerService = await this.nodeService.createConnection({});
    
    const html = this.emailRepo.forgotPassword(link, user.username);
    const mailData = {
      from: SMTP_MAIL_USERNAME,
      to: email,
      subject: mailSubject.FORGOT_PASSWORD,
      text: '',
      html: html,
    };
    await nodeMailerService.sendNodeMail(mailData);
  };

  public checkForgotPasswordToken = async (userId:string, token:string) => {
    const user = await this.findById(userId);
    if (!user) throw new AppError({ httpCode: HttpCode.BAD_REQUEST, description: errorMessage.USER_NOT_FOUND });

    const tokenData = await Token.findOne({
      userId: user._id,
      token: token,
    });
    if (!tokenData) throw new AppError({ httpCode: HttpCode.BAD_REQUEST, description: errorMessage.INVALID_FORGOT_TOKEN });
  };

  public passwordReset = async (userId:string, token:string, password:string) => {
    const user = await this.findById(userId);
    if (!user) throw new AppError({ httpCode: HttpCode.BAD_REQUEST, description: errorMessage.USER_NOT_FOUND });
    const tokenFilter = {
      userId: user._id,
      token: token,
    }
    const tokenData = await Token.findOne(tokenFilter);
    if (!tokenData) throw new AppError({ httpCode: HttpCode.BAD_REQUEST, description: errorMessage.USER_NOT_FOUND });

    user.password = password;
    await user.save();
    await Token.deleteOne(tokenFilter);    
  };

  public updateProfile = async (data: UpdateProfileInterface, userId: string) => {
    const { name, file } = data;
    const user = await this.findById(userId);
    if (user) {
      user.name = name;
      user.avatar = file?file.filename:user.avatar;
      user.save();
    } else throw new AppError({ httpCode: HttpCode.BAD_REQUEST, description: errorMessage.USER_NOT_FOUND });
  };

  public userProfile = async (userId: string) => {
    const user = await this.findById(userId);
    // check user;
    if (user) {
      const userRole = await UserRole.findOne({ userId: userId }) 
      let role = null
      if(userRole){
       role = await Role.findOne({ _id: userRole.roleId }).select('slug name'); 
      }
      const res = {
        user:user,
        role:role
      }
      return res;
    } else throw new AppError({ httpCode: HttpCode.BAD_REQUEST, description: errorMessage.USER_NOT_FOUND });
  };

  public logout = async (token: string) => {
    addToBlacklist(token);
    return true
  };
}
