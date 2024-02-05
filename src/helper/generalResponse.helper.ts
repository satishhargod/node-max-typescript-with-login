import { Request, Response } from 'express';
import { errorMessage } from '../constants/error.constants';

export type errorMessage = keyof typeof errorMessage;

const generalResponse = (
  request: Request,
  response: Response,
  data: any = [],
  message: String,
  toast: boolean = false,
  responseType: string = 'success',
  statusCode: number = 200,
) => {
  response.status(statusCode).send({
    data: data,
    message: message,
    toast: toast,
    responseType: responseType,
  });
};

export default generalResponse;
