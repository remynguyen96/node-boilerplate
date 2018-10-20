const nodemailer = require('nodemailer');
const { TemplateMail } = require('../utils/template-mail');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

const MailConfirmOrder = ({ name, email, phone, address, quantity, receive, books }) => (
  new Promise((resolve, reject) => {
    if (email && phone) {
      const mail = {
        from: `Mail Xác Nhận Đăng kí Mua Sách 📗 - <${process.env.MAIL_OWNER}>`,
        to: `${email}`,
        subject: `${name} Đăng Kí Mua Sách Thành Công ✔`,
        html: TemplateMail({ name, email, phone, address, quantity, receive, books }),
      };
      resolve(mail);
    } else {
      reject(new Error('Don\'t have infomation to send mail !'));
    }
  })
);

const MailOwner = ({ name, email, phone, address, quantity, receive, books }) => (
  new Promise((resolve, reject) => {
    if (email && phone) {
      const mail = {
        from: `${email} Đăng Kí Mua Sách 📖`,
        to: process.env.MAIL_OWNER,
        subject: `${name} đăng kí mua: ${books} ✔`,
        html: TemplateMail({ name, email, phone, address, quantity, receive, books }),
      };
      resolve(mail);
    } else {
      reject(new Error('Don\'t have infomation to send mail !'));
    }
  })
);

const SendMailServer = async (templateMail) => {
  await transporter.sendMail(templateMail, (error, info) => {
    if (error) {
      return error;
    }
    console.table({
      level: 'info',
      message: `Mail %s sent: ${info.messageId}, ${info.response}`,
    });
    return info;
  });
};

module.exports = {
  SendMailServer,
  MailOwner,
  MailConfirmOrder,
};

