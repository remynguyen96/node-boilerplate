// import CryptoJS from 'crypto-js';
import { Promise } from 'sequelize';
import models from '../../config/mysql';
import { URL_SERVER } from '../../utils/helper';
import { MailConfirmAccount, MailResetPassword, SendMailServer } from '../../config/mail';

const { Users, Roles } = models;

const verifiedAccount = (info) => {
    const { name, email, passClient } = info;
    return new Promise(async (resolve, reject) => {
        try {
            if (!name) {
                reject(new Error('Name is required !'));
            } else if (!email) {
                reject(new Error('Email is required !'));
            } else if (!passClient) {
                reject(new Error('Password is required !'));
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
        const handleInfo = await verifiedAccount(req.body);
        const roleMember = await Roles.findOne({ where: { name: 'Member' } });
        await handleInfo.setRoles([roleMember]);
        const [role] = await handleInfo.getRoles(Roles);
        const [accessToken, refreshToken] = await Users.createToken(handleInfo);
        const userInfo = Users.getJSON(handleInfo);
        const authInfo = { ...userInfo, accessToken, refreshToken };
        res.set('Access-Control-Expose-Headers', 'X-Authorization, X-Refresh-Authorization');
        res.set('X-Authorization', authInfo.accessToken);
        res.set('X-Refresh-Authorization', authInfo.refreshToken);
        const templateMail = await MailConfirmAccount({
            ...authInfo,
            url: URL_SERVER(req, 'users/verified-email/'),
        });
        await SendMailServer(templateMail);
        return res.status(201).json({ ...userInfo, roleName: role.name });
    } catch (err) {
        return res.status(400).json(err);
    }
};

export const signIn = async (req, res) => {
    try {
        return res.status(200).json(req.user);
    } catch (err) {
        return res.status(400).json(err);
    }
};

export const verifiedEmail = async (req, res) => {
    try {
        let success = false;
        const { token } = req.params;
        const verify = Users.verifyRefreshToken(token);
        const users = await Users.findById(verify.id);
        if (users) {
            success = true;
            await users.update({ verified: true });
        }
        return res.status(200).json({ success });
    } catch (err) {
        return res.status(400).json(err);
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const users = await Users.findOne({ where: { email } });
        let success = false;
        if (users) {
            const userInfo = users.toJSON();
            const [accessToken, refreshToken] = await Users.createToken(userInfo);
            const authInfo = { ...userInfo, accessToken, refreshToken };
            const templateMail = await MailResetPassword({
                ...authInfo,
                url: URL_SERVER(req, 'users/update-password/'),
            });
            await SendMailServer(templateMail);
            success = true;
        }
        return res.status(200).json({ success });
    } catch (err) {
        return res.status(400).json(err);
    }
};

export const updatePassword = async (req, res) => {
    try {
        let success = false;
        const { token } = req.params;
        const verify = Users.verifyRefreshToken(token);
        const users = await Users.findById(verify.id);
        if (users) {
            success = true;
            // redirect to page to update password;
        }
        return res.status(200).json({ success });
    } catch (err) {
        return res.status(400).json(err);
    }
};

const findUser = async (id, callback) => {
    const users = await Users.findById(id);
    if (users) {
        const infoUser = Users.getJSON(users.toJSON());
        return callback(infoUser, users);
    }
    return callback({ message: 'Not found infomation !' });
};

export const getProfile = async (req, res) => {
    try {
        const { id } = req.params;
        return await findUser(id, (infoUser) => res.status(200).json(infoUser));
    } catch (err) {
        return res.status(400).json(err);
    }
};

export const editProfile = async (req, res) => {
    try {
        const { id } = req.params;
        return await findUser(id, async (infoUser, user) => {
            if (infoUser.message) {
                return res.status(400).json(infoUser);
            }
            const updateUser = await user.update(req.body);
            return res.status(200).json(updateUser);
        });
    } catch (err) {
        return res.status(400).json(err);
    }
};

export const removeProfile = async (req, res) => {
    try {
        const { id } = req.params;
        return await findUser(id, async (infoUser, user) => {
            if (infoUser.message) {
                return res.status(400).json(infoUser);
            }
            await user.destroy();
            return res.status(200).json({ success: true });
        });
    } catch (err) {
        return res.status(400).json(err);
    }
};
