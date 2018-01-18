import nodemailer from 'nodemailer';
import constants from './constants';

const transporter = nodemailer.createTransport({
    host: constants.MAIL_HOST,
    port: constants.MAIL_PORT,
    secure: false, // true with port 465
    auth: {
        user: constants.MAIL_USERNAME,
        pass: constants.MAIL_PASSWORD,
    },
});

export const mailConfirm = (info) => {
    const {email, token, name, url} = info;
    return new Promise((resolve, reject) => {
        if (info) {
            const mail = {
                from: 'Welcome to website meditation 👻 <remynguyen@gmail.com>',
                to: `${email}`,
                subject: `Hello ${name} ✔ This is Mail Confirm Account !`,
                text: 'Please confirm email to login website !',
                html: ` <h2>Hello ${name}, welcome to website</h2>
                        <a style="display: block;font-size:27px; color: #174DCF; text-align:center" href="${url}/confirm/${token}">
                            Confirm Email
                        </a>`,
            };
            resolve(mail);
        } else {
            reject(`Don't have infomation to send mail !`);
        }
    });
};

export const editPassSuccess = (info) => {
    const {email, name} = info;
    return new Promise((resolve, reject) => {
        if (info) {
            const mail = {
                from: `Welcome to website meditation 👻 <remynguyen@gmail.com>`,
                to: `${email}`,
                subject: `Update password for account successful ✔`,
                text: `Update password done !`,
                html: `
                <h2 style="text-align: center">Congratulation ${name}, you had update password successful !</h2>`,
            };
            resolve(mail);
        } else {
            reject(`Don't have infomation to send mail !`);
        }
    });
};

export const resetPass = (info) => {
    const {email, name, url} = info;
    return new Promise((resolve, reject) => {
        if (info) {
            const mail = {
                from: `Welcome to website meditation 👻 <remynguyen@gmail.com>`,
                to: `${email}`,
                subject: `Do you want to reset password account ✔`,
                text: `Please click link here to reset password !`,
                html: `
                <h2 style="text-align: center">Hi ${name}, click link below here to reset password, please !</h2>
                <a style="display: block;font-size:27px; color: #70FF95; text-align:center" href="${url}">
                    Reset Password
                </a>`,
            };
            resolve(mail);
        } else {
            reject(`Don't have infomation to send mail !`);
        }
    });
};

export const sendMailServer = async (templateMail) => {
    const mail = await transporter.sendMail(templateMail, (error, info) => {
        if (error) {
            return error;
        }
        // console.log('Mail %s sent: %s', info.messageId, info.response);
    });
    return mail;
};
