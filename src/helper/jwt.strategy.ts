// import { ExtractJwt, Strategy as JWTStrategy, VerifyCallback } from 'passport-jwt';
// import { SECRET_KEY } from '../config';
// import { Strategy } from '../interfaces/strategy.interface';

// export default class JWT extends Strategy {
//   Ctor = JWTStrategy;
//   type = 'jwt';
//   constructor() {
//     super();
//   }

//   readonly getConfig = (_env: NodeJS.ProcessEnv, _callbackURL: string) => {
//     return {
//       jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
//       secretOrKey: SECRET_KEY,
//     };
//   };

//   toUser: VerifyCallback = async (JWTPayload, done) => {
//     try {
//       //const user = await new UserRepo().get({ where: { email: JWTPayload.email } });
//       const user = { email: 'dummy data' };

//       if (user) {
//         done(null, user);
//       } else {
//         done(null, false);
//       }
//     } catch (err) {
//       done(err);
//     }
//   };
// }
