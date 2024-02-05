import { UserDocument } from '../models/user.model';

export interface PasswordInterface {
  password: string;
}


export interface LoginInterface {
  email: string;
  password: string;
}

interface Filedata {
	filename: string;
}

export interface UpdateProfileInterface {
  name: string;
  file: Filedata
}

export interface ChangePasswordInterface {
  email: string;
  oldpassword: string;
  newpassword: string;
}

export type TokenDataInterface = {
  user: UserDocument;
};


export interface ForgotPasswordInterface {
  email: string;
}
