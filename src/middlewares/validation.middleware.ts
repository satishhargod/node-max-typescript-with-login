import { RequestHandler } from 'express';
import generalResponse from '../helper/generalResponse.helper';
import { cleanObj } from '../utils';

type ErrorType = {
  message: string;
  path: Object;
  type: string;
  context: any;
};

const errorFilterValidator = (error: Array<ErrorType>) => {
  const extractedErrors: Array<string> = [];
  error.forEach((err: ErrorType) => extractedErrors.push(err.message));
  const errorResponse = extractedErrors.join(', ');
  return errorResponse;
};

const validationMiddleware = (type: any, value: 'body' | 'query' | 'params' | any = 'body'): RequestHandler => {
  return async (req: any, res, next) => {
    try {
      cleanObj(req[value]);
      req[value] = await type.validateAsync(req[value]);
      return next();
    } catch (e) {
      const error: any = e;
      if (error.details) {
        const errorResponse = errorFilterValidator(error.details);
        return generalResponse(req, res, errorResponse, 'VALIDATION_ERROR', true, 'error', 400);
      }
      return generalResponse(req, res, error, 'SOMETHING_WRONG', true, 'success', 400);
    }
  };
};

export default validationMiddleware;
