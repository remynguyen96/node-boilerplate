import nodemailer from 'nodemailer';
import constants from './constants';

nodemailer.createTransport({
    host: constants.MAIL_HOST,
    port: constants.MAIL_PORT,
    secure: false,
    auth: {
        user: constants.MAIL_PASSWORD,
        pass: constants.MAIL_USERNAME,
    },
});

export const verifiedEmail = (email, token, name, url) => {
    const url = `${req.protocol}://${req.get('host')}`;
    // return new Promise((resolve, reject) => {
    // });
    return {
            from: 'Welcome to website meditation 👻 <remynguyen@gmail.com>',
            to: `${email}`,
            subject: `Hello ${name} ✔ This is Mail Confirm Account !`,
            text: 'Please confirm email to login website !',
            html: `
           <h2>Hello ${name}, welcome to website</h2>
            <a style="display: block;font-size:27px; color: #174DCF; text-align:center" href="${url}/${token}">
        Confirm Email
      </a>
        `,
    };
};
