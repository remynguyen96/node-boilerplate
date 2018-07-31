const defaultConfig = {
  PORT: process.env.PORT || 4500
};

const options = {
  development: {
    MONGO_URL: 'mongodb://localhost:27017/boilerplate',
    // MONGO_URL: 'mongodb://root:secret@localhost:27017/boilerplate',
    // MONGO_URL: 'mongodb://root:secret@127.0.0.1:27017/boilerplate',

    JWT_SECRET: 'understanding mediation',
    PASSPORTCODE: 'I-LOVE-MOM',
    IV: '#base64IV#',

    MAIL_HOST: 'smtp.mailtrap.io',
    MAIL_PORT: '2525',
    MAIL_USERNAME: 'a1285327665551',
    MAIL_PASSWORD: '0875bbf87059c7',
  },
  production: {
    MONGO_URL: ''
  }
};

function getENV(env) {
  return options[env];
}

export const constants = {
  ...defaultConfig,
  ...getENV(process.env.NODE_ENV),
};
