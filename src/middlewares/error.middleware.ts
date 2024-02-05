import { NextFunction, Request, Response } from 'express';
import generalResponse from '../helper/generalResponse.helper';
// import { HttpException } from '../helper/httpException';

const errorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    if (error instanceof HttpException) {
      // @ts-ignore
      const status: number = error.status || 500;
      return generalResponse(req, res, null, 'SOMETHING_WRONG', true, 'error', status);
    }

    // if (axios.isAxiosError(error)) {
    //   // axios Error
    //   return generalResponse(
    //     req,
    //     res,
    //     {
    //       code: error.code,
    //       detailError: error.response?.data,
    //     },
    //     'SOMETHING_WRONG',
    //     false,
    //     'error',
    //     error.response?.status || 500,
    //   );
    // }

    // if (error instanceof DatabaseError) {
    //   return generalResponse(req, res, error.message ? error?.message : error, 'SOMETHING_WRONG', false, 'error', 500);
    // }

    return generalResponse(req, res, error.stack, 'SOMETHING_WRONG', false, 'error', 500);
  } catch (err) {
    next(err);
  }
  return true;
};

// if the Promise is rejected this will catch it
// process.on('unhandledRejection', (error) => {
//   logger.log('info', 'Unhandled Rejection', error);
// });

// process.on('uncaughtException', (error) => {
//   logger.log('info', 'Uncaught Exception', error);
// });

export default errorMiddleware;
