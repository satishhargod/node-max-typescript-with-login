import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';
import passport from 'passport';
import { getTokenBlacklist } from '../common/tokenBlacklist';
import { errorMessage } from '../constants/error.constants';
import { AppError, HttpCode } from '../exceptions/AppError';
import { UserDocument } from '../models/user.model';
// By Pass Url
const byPassUrls = ['test'];

const checkInclude = (req: any) => {
  return byPassUrls.find((a) => req.url.includes(a));
};

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (checkInclude(req) && _.isUndefined(req.headers['authorization'])) {
      next();
    } else {
      const tokenBlacklist = getTokenBlacklist();
      if (tokenBlacklist.has(req.headers['authorization'])) {
        throw new AppError({ httpCode: HttpCode.UNAUTHORIZED, description: errorMessage.INVALID_TOKEN });
      }
      passport.authenticate('jwt', (err: Error, user: UserDocument) => {
        if (err) return next(err);
        if (checkInclude(req)) {
          if (user) setUserData(req, user);
          next();
        } else if (!user) throw new AppError({ httpCode: HttpCode.UNAUTHORIZED, description: errorMessage.INVALID_TOKEN });
        else {
          setUserData(req, user);
          return next();
        }
      })(req, res, next);
    }
  } catch (error) {
    throw new AppError({ httpCode: HttpCode.UNAUTHORIZED, description: errorMessage.INVALID_TOKEN });
  }
};

const setUserData = (req: Request, user: UserDocument) => {
  //NOSONAR
  // const byPassVerifications = ['/2FA/verify', '/2FA/qr', 'set-password'];
  // if (user && !byPassVerifications.find((a) => req.url.includes(a)))
  //   throw new AppError({ httpCode: HttpCode.UNAUTHORIZED, description: errorMessage.INVALID_TOKEN });
  req.tokenData = {
    user: user,
  };
};

export default authMiddleware;
