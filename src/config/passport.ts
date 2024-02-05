import { SECRET_KEY } from '../config';
// import passportLocal from "passport-local";
// const passportLocalStrategy = passportLocal.Strategy;

// import passportFacebook from "passport-facebook";
// const passportFacebookStrategy = passportFacebook.Strategy;

import passportJwt from 'passport-jwt';
const passportJwtStrategy = passportJwt.Strategy;

import { User } from '../models/user.model';

const passportConnection = async (passport: any) => {
  passport.serializeUser(User);
  passport.deserializeUser(User);

  //   passport.use( new passportLocalStrategy( User.authenticate() ) );
  //   passport.use( new passportFacebookStrategy(
  //     {
  //         clientID: "166601673763093",
  //         clientSecret: "fc3e912cc8a10d23dca0ebc9ce6e5411",
  //         callbackURL: "http://localhost:3000/auth/facebook/callback"
  //     },
  //     User.authenticateFacebook()  // accessToken, refreshToken, profile, cb
  //   ) );

  // verify, apiLoginRequired

  passport.use(
    new passportJwtStrategy(
      {
        secretOrKey: SECRET_KEY,
        jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      },
      async function (user, callback) {
        const userData = await User.findOne({ email: user.email });
        let err = false;
        if (err) {
          return callback(err, false);
        }

        if (userData) {
          return callback(null, userData);
        }

        return callback(null, false);
      },
    ),
  );
};

export default passportConnection;
