import { Request, Response } from 'express';
import generalResponse from '../../helper/generalResponse.helper';

export class HomeController {
  readonly createCalendarEvent = async (req: Request, res: Response) => {
    return generalResponse(req, res, [], 'USER_CREATE', false, 'success', 200);
  };
}
