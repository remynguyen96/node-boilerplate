import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import AuthModel, { compareStr } from './auth.model';
import constants from '../../config/constants';

const localOpts = {
  usernameField: 'email',
};
const localLogin = new LocalStrategy(localOpts, async (email, password, done) => {
  try {
    const user = await AuthModel.findOne({ email });
    if (!user) {
      return done(null, false);
    } else if (!user._comparePassword(password)) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
});

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: constants.JWT_SECRET
};
const jwtLogin = new JwtStrategy(jwtOpts, async (payload, done) => {
  try {
    const user = await AuthModel.findById(payload._id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
});

passport.use(localLogin);
passport.use(jwtLogin);

export const authLocal = passport.authenticate('local', { session: false });
export const authJwt = passport.authenticate('jwt', { session: false });
