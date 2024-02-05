import { Request, Response } from 'express';
import generalResponse from '../../helper/generalResponse.helper';
import UserRepository from '../../repositories/user/user.repository';

export class UserController {
  private userRepository = new UserRepository();

  readonly createCalendarEvent = async (req: Request, res: Response) => {
    return generalResponse(req, res, [], 'USER_CREATE', false, 'success', 200);
  };

  public createUser = async (req: Request, res: Response) => {
    return generalResponse(req, res, [], 'USER_CREATE', true, 'error');
  };

  public getUser = async (req: Request, res: Response) => {
    console.log('test validation');

    return generalResponse(req, res, [], 'USER_CREATE', true, 'error');
  };
}
