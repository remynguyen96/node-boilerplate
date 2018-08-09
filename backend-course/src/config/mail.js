import nodemailer from 'nodemailer';
import { Promise } from 'sequelize';
import { constants } from './constants';
import { ConfirmAccount } from '../utils/template-mail';

const transporter = nodemailer.createTransport({
  host: constants.MAIL_HOST,
  port: constants.MAIL_PORT,
  secure: false,
  auth: {
    user: constants.MAIL_USERNAME,
    pass: constants.MAIL_PASSWORD,
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
    console.log('Mail %s sent: %s', info.messageId, info.response);
    return info;
  });
};
