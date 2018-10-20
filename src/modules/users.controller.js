/* eslint-disable no-useless-escape,no-restricted-syntax,no-prototype-builtins,no-buffer-constructor */
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
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

const isEmptyData = () => {
  if (!isEmpty(db.getState())) {
    return true;
  }
  return false;
};

const sendMail = async (req, res) => {
  try {
    const { name, email, phone, address, quantity, receive, books } = req.body;
    const [validateForm, validateEmail, validatePhone] = await Promise.all([
      verifiedForm({
        name,
        address,
        quantity,
        receive,
        books,
      }),
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
      if (isEmptyData()) {
        db.getState();
        id += db.getState().users.length;
      }
      db.defaults({ users: [] })
        .write();
      db.get('users')
        .push({
          id,
          name,
          email,
          phone,
          address,
          quantity,
          receive,
          books,
        })
        .write();
      return res.status(201)
        .json({ success: true });
    }
    return res.status(401)
      .json({ info: 'Form is not valid !' });
  } catch (err) {
    return res.status(400)
      .json(err);
  }
};

const listMailRegister = (req, res) => {
  const url = `${req.protocol}://${req.get('host')}/favicon.ico`;
  res.set('Content-Type', 'text/html');
  if (isEmptyData()) {
    const { users } = db.getState();
    res.send(new Buffer(`
        <!doctype html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Thông Tin Người Mua Sách</title>
          <link id="favicon" rel="icon" type="image/x-icon" href="${url}">
          <style type="text/css">
          .container {
            width: 100%;
            margin: 10px auto;
            font-size: 16px;
            overflow-x: auto;
          }
          .container table {
            border-collapse: collapse;
            width: 100%;
          }
          .container table, td, th {
            border: 1px solid #bababa;
            margin-bottom: 35px;
          }
          .container td {
            padding: 8px;
          }
          .container th {
            text-transform: capitalize;
            text-align: center;
            height: 40px;
            padding: 0 5px;
          }
          .container td {
            text-align: center;
          }
          .container tr:nth-child(even) {
            background-color: #f8f8f8;
          }
        </style>
        </head>
        <body>
        <div class="container">
          <table>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Địa Chỉ</th>
              <th>email</th>
              <th>số điện thoại</th>
              <th>Đăng ký nhận sách</th>
              <th>Chọn mua</th>
              <th>Số lượng</th>
            </tr>
            ${users.map(({ id, name, address, email, phone, receive, books, quantity }) => `
              <tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${address}</td>
                <td>${email}</td>
                <td>${phone}</td>
                <td>${receive}</td>
                <td>${books}</td>
                <td>${quantity}</td>
              </tr>
            `)}
          </table>
        </div>
        </body>
        </html>
    `));
  } else {
    res.send(new Buffer(`
    <h3 style="text-align: center; font-size: 28px; color: #5A5F61">
    Sorry, We Cannot Find That!
    </h3>`));
  }
};

module.exports = {
  sendMail,
  listMailRegister,
};

