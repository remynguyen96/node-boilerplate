/* eslint-disable no-useless-escape,no-restricted-syntax,no-prototype-builtins */
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { SendMailServer, MailConfirmOrder, MailOwner } = require('../config/mail');

const adapter = new FileSync('db.json');
const db = low(adapter);
const verifiedForm = ({ name, address, quantity, receive, books }) => new Promise(async (resolve, reject) => {
  try {
    if (!name) {
      reject(new Error('Name is required !'));
    } else if (!address) {
      reject(new Error('Address is required !'));
    } else if (!quantity) {
      reject(new Error('Quantity is required !'));
    } else if (!receive) {
      reject(new Error('Place receive is required !'));
    } else if (!books) {
      reject(new Error('Books is required !'));
    }
    resolve(true);
  } catch (err) {
    reject(err);
  }
});

const verifiedEmail = (email) => (
  new Promise((resolve, reject) => {
    const regx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regx.test(email)) {
      reject(new Error('Email is not valid !'));
    }
    resolve(true);
  })
);

const verifiedPhone = (phone) => (
  new Promise((resolve, reject) => {
    const regx = /^[^A-Za-z!@#$%^&*()]+$/g;
    if (!regx.test(phone)) {
      reject(new Error('Phone is not valid !'));
    }
    resolve(true);
  })
);

const isEmpty = (obj) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) { return false; }
  }
  return true;
};

const sendMail = async (req, res) => {
  try {
    const { name, email, phone, address, quantity, receive, books } = req.body;
    const [validateForm, validateEmail, validatePhone] = await Promise.all([
      verifiedForm({ name, address, quantity, receive, books }),
      verifiedEmail(email),
      verifiedPhone(phone),
    ]);
    if (validateForm && validateEmail && validatePhone) {
      const templateMailOrder = await MailConfirmOrder(req.body);
      const templateMailOwner = await MailOwner(req.body);
      await Promise.all([
        SendMailServer(templateMailOrder),
        SendMailServer(templateMailOwner),
      ]);
      let id = 1;
      if (!isEmpty(db.getState())) {
        db.getState();
        id += db.getState().users.length;
      }
      db.defaults({ users: [] }).write();
      db.get('users')
        .push({ id, name, email, phone, address, quantity, receive, books })
        .write();
      return res.status(201).json({ success: true });
    }
    return res.status(401).json({ info: 'Form is not valid !' });
  } catch (err) {
    return res.status(400).json(err);
  }
};

// const listMailRegister = async (req, res) => {
//   try {
//     const { token } = req.params;
//     const verify = Users.verifyAccessToken(token);
//     const users = await Users.findById(verify.id);
//     if (users) {
//       await users.update({ verified: true });
//       res.redirect('/');
//     }
//     return null;
//   } catch (err) {
//     return res.status(400).json(err);
//   }
// };

module.exports = {
  sendMail,
  // listMailRegister,
};

