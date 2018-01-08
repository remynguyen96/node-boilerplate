import Auth, {hashStr} from './auth.model';
// import constants from '../../config/constants';
// import CryptoJS from 'crypto-js';
// import jwt from 'jsonwebtoken';

//Sign Up
function handingRegister({name, email, password}) {
    if(!name) {
        throw new Error('Name is required !');
    } else if (!email) {
        throw new Error('Email is required !');
    } else if (!password) {
        throw new Error('Password is required !');
    }
    try {
        const token =  hashStr(email);
        return Auth.create({name, email, password, token});
    } catch (err) {
        throw err;
    }
}

export const signUp = async (req, res) => {
    try {
        const user = await handingRegister(req.body);
        return res.status(201).json(user);
    } catch (err) {
        return res.status(400).json({error: String(err)})
    }
};
//Sign In
export const signIn = async (req, res, next) => {
    req.status(200).json(req.user.toAuthJson());
    return next();
};
//Confirm Email
export const verifiedEmail = async (req, res) => {
    let fullUrl = `${req.protocol}://${req.get('host')} ${req.originalUrl}`;
    console.log(fullUrl);
};
//Reset Password
export const resetPassword = async (req, res) => {

}
//Update Password
export const updatePassword = async (req, res) => {

};
//Refresh Token
export const refreshToken = async (req, res) => {

};
