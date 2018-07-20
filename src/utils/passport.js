import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { decode } from 'jsonwebtoken';
import models from '../config/mysql';
import { constants } from '../config/constants';

const { Users } = models;

const parseToken = (tokenVal) => {
  const regx = /(\S+)\s+(\S+)/;
  if (typeof tokenVal !== 'string') {
    return null;
  }
  const matches = tokenVal.match(regx);
  return matches && matches[1] === constants.PASSPORTCODE && matches[2];
};


const localOpts = {
  usernameField: 'email',
};
const localLogin = new LocalStrategy(localOpts, async (email, password, done) => {
  try {
    const users = await Users.findOne({ where: { email } });
    if (!users) {
      return done(null, false);
    } else if (!Users.comparePassword(password, users.password)) {
      return done(null, false);
    } else if (users.verified === 0) {
      return done(null, false);
    }
    const userInfo = Users.getJSON(users.toJSON());
    const accessToken = await Users.createToken(userInfo);
    const authInfo = {
      ...userInfo,
      accessToken,
    };
    return done(null, authInfo);
  } catch (err) {
    return done(err, false);
  }
});

const jwtOpts = {
  secretOrKey: constants.JWT_SECRET,
  jwtFromRequest: (req) => {
    const tokenAccess = parseToken(ExtractJwt.fromHeader('x-authorization')(req));
    if (tokenAccess) {
      const { id, exp } = decode(tokenAccess);
      const timeNow = Math.floor(Date.now() / 1000);
      const timeToExpireAccess = (exp - timeNow);
      if (timeToExpireAccess < 0) {
        return Users.createAcToken({ id });
      }
      return tokenAccess;
    }
    return null;
  },
};

const jwtAccess = new JwtStrategy(jwtOpts, async (payload, done) => {
  try {
    const users = await Users.findById(payload.id);
    if (!users) {
      return done(null, false);
    }
    const auth = Users.getJSON(users.toJSON());
    return done(null, { ...auth });
  } catch (err) {
    return done(err, false);
  }
});

passport.use(localLogin);
passport.use(jwtAccess);

export const authLocal = passport.authenticate('local', { session: false });
export const authJwt = passport.authenticate('jwt', { session: false });
