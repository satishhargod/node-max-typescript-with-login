import { UserDocument } from '../../models/user.model';
export { };
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