const nodemailer = require('nodemailer');
const { ConfirmAccount } = require('../utils/template-mail');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const MailConfirmAccount = (info) => {
  const { email, name, url, token } = info;
  return new Promise((resolve, reject) => {
    if (info) {
      const mail = {
        from: 'Welcome to website meditation 👻 <remynguyen@gmail.com>',
        to: `${email}`,
        subject: `Hello ${name} ! This is Mail Confirm Account ✔`,
        text: 'Please confirm email to login website !',
        html: ConfirmAccount(name, url, token),
      };
      resolve(mail);
    } else {
      reject(new Error('Don\'t have infomation to send mail !'));
    }
  });
};

export const SendMailServer = async (templateMail) => {
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
