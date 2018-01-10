import passport from 'passport';
import LocalStrategy from 'passport-local';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import GoogleStrategyToken from 'passport-google-plus-token';
import FbStrategyToken from 'passport-facebook-token';
import models from '../models';
import constants from './constants';

const User = models.User;
const localOpts = {
    usernameField: 'email',
};
const localLogin = new LocalStrategy(localOpts, async (email, password, done) => {
    try {
        const user = await User.findOne({ where: { email: email } });
        if(!user) {
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
    // jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: constants.JWT_SECRET
};
const jwtLogin = new JwtStrategy(jwtOpts, async (payload, done) => {
    try {
        console.log(payload);
        const user = await User.findById(payload.id);
        if(!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (err) {
        return done(err, false);
    }
});

passport.use(localLogin);
passport.use(jwtLogin);

export const authLocal =  passport.authenticate('local', {session: false});
export const authJwt = passport.authenticate('jwt', {session: false});
