import * as passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import passportLocal from 'passport-local';
import { constants } from '../../config/constants';
import { Auth } from '../auth/auth.model';


const LocalStrategy = passportLocal.Strategy;

const localOpts = {
    usernameField: 'email',
};

const localLogin = new LocalStrategy(localOpts, 
  async (email: string, password: string, done: any): Promise<object> => {
  try {
    const user = await Auth.findOne({
      email
    });
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
    secretOrKey: constants.JWT_SECRET,
};
const jwtLogin = new JwtStrategy(jwtOpts, async (payload, done) => {
    try {
        const { _id: id } = payload;
        const user = await Auth.findById(id);
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
