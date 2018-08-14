const { Promise } = require('sequelize');
const models = require('../../config/mysql');
const { URL_SERVER } = require('../../utils/helper');
const { MailConfirmAccount, SendMailServer } = require('../../config/mail');

const { Users } = models;

const verifiedAccount = (info) => {
  const { name, email, phone, confirm } = info;
  return new Promise(async (resolve, reject) => {
    try {
      if (!name) {
        reject(new Error('Name is required !'));
      } else if (!email) {
        reject(new Error('Email is required !'));
      } else if (!confirm) {
        reject(new Error('Password is required !'));
      } else if (!phone) {
      reject(new Error('Phone is required !'));
      }
      const user = await Users.create(info);
      resolve(user);
    } catch (err) {
      reject(err);
    }
  });
};

const signUp = async (req, res) => {
  try {
    const handleInfo = await verifiedAccount(req.body);
    const token = await Users.createToken(handleInfo);
    const userInfo = Users.getJSON(handleInfo);
    res.set('Access-Control-Expose-Headers', 'X-Authorization');
    res.set('X-Authorization', token);
    const templateMail = await MailConfirmAccount({
      ...userInfo,
      token,
      url: URL_SERVER(req, 'users/verified-email'),
    });
    await SendMailServer(templateMail);
    return res.status(201).json({ ...userInfo, token });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const signIn = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const listUser = async (req, res) => {
  try {
    const listUsers = await Users.findAll({
      order: [
        ['id', 'DESC'],
      ],
    });
    return res.status(200).json(listUsers);
  } catch (err) {
    return res.status(400).json({ error: String(err) });
  }
};

const verifiedEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const verify = Users.verifyAccessToken(token);
    const users = await Users.findById(verify.id);
    if (users) {
      await users.update({ verified: true });
      res.redirect('/');
    }
    return null;
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = {
  signUp,
  signIn,
  listUser,
  verifiedEmail,
};

