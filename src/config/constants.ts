const defaultConfig = {};

const options: { [key: string]: object }  = {
  development: {
    PORT: process.env.PORT || 4500,
    MONGO_URL: 'mongodb://localhost:27017/boilerplate',


    JWT_SECRET: 'secret',
    PASSPORTCODE: 'lifestyle',
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

function getENV(env: string): object {
  return options[env];
}

export const constants = {
  ...defaultConfig,
  ...getENV(process.env.NODE_ENV || 'development'),
};