const defaultConfig = {
  PORT: process.env.PORT || 4500,
};

const config = {
  development: {
    MYSQL_DB: 'node-course',
    MYSQL_USERNAME: 'root',
    MYSQL_PASSWORD: '',

    JWT_SECRET: 'bikini',
    PASSPORTCODE: 'Auth',
    EXP_TOKEN_ACCESS: '15m',
    EXP_TOKEN_REFRESH: '7 days',

    MAIL_HOST: 'smtp.mailtrap.io',
    MAIL_PORT: 2525,
    MAIL_USERNAME: 'a1285327665551',
    MAIL_PASSWORD: '0875bbf87059c7',
  },
  production: {
    MYSQL_DB: '',
    MYSQL_USERNAME: '',
    MYSQL_PASSWORD: '',
  },
};

const getENV = (env) => config[env];

export const constants = {
  ...defaultConfig,
  ...getENV(process.env.NODE_ENV),
};
