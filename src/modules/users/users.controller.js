// import CryptoJS from 'crypto-js';
import models from '../../config/mysql';
import {mailConfirm, sendMailServer} from '../../config/mail';

const Users = models.Users;

const verifiedAccount = (info) => {
    const {name, email, passClient} = info;
    return new Promise(async (resolve, reject) => {
        try {
            if (!name) {
                reject('Name is required !');
            } else if (!email) {
                reject('Email is required !');
            } else if (!passClient) {
                reject('Password is required !');
            }
            const user = await Users.create(info);
            resolve(user);
        } catch (err) {
            reject(err);
        }
    });
};

export const signUp = async (req, res) => {
    try {
        const url = `${req.protocol}://${req.get('host')}`;
        const handleInfo = await verifiedAccount(req.body);
        const token = Users.createToken(handleInfo.id);
        const infoUser = {...handleInfo.toJSON(), url, token};
        const templateMail = await mailConfirm(infoUser);
        await sendMailServer(templateMail);
        return res.status(200).json({success: true});
    } catch (err) {
        res.status(400).json(err);
    }
};

export const signIn = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const verifiedEmail = async (req, res) => {
    try {
        console.log(res.body);
        res.status(200).json(res);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const refreshToken = async (req, res) => {
    try {
        res.status(200).json(res);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const resetPassword = async (req, res) => {
    try {
        res.status(200).json(res);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const updatePassword = async (req, res) => {
    try {
        res.status(200).json(res);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const editProfile = async (req, res) => {
    try {
        res.status(200).json(res);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const removeUser = async (req, res) => {
    try {
        res.status(200).json(res);
    } catch (err) {
        res.status(400).json(err);
    }
};

