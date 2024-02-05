import { NextFunction, Request, Response } from 'express';
import generalResponse from '../../helper/generalResponse.helper';

export default class RouterUtils {
  public static async handleRestServerAction(
    handleMethod: (req: Request, res: Response, next: NextFunction) => Promise<void>,
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      // Process
      await handleMethod(req, res, next);
    } catch (error) {
      return generalResponse(req, res, [], 'SOMETHING_WRONG', true);
    }
  }
}

export type ResponseHandler = {
  req: Request;
  res: Response;
  message?: string | [] | null;
  data?: object | null;
  statusCode?: number | null | undefined;
  status?: boolean | number | null | undefined;
  errors?: unknown | null;
};

export const apiResponseHandler = ({ res, message, data, statusCode, status, errors }: ResponseHandler): Response => {
  return res.status(statusCode ? statusCode : 200).json({
    status: {
      code: statusCode ? statusCode : 200,
      status: status ? Boolean(status) : true,
    },
    message: message ? message : 'Success',
    data: data || null,
    errors: errors || null,
  });
};
