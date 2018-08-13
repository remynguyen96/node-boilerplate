const defaultConfig = {
  PORT: process.env.PORT || 4500,
  JWT_SECRET: 'jwt-secret',

  PASSPORTCODE: 'Auth',
  EXP_TOKEN_ACCESS: '1h',

  MAIL_HOST: 'smtp.mailtrap.io',
  MAIL_PORT: 25,
  MAIL_USERNAME: 'a1285327665551',
  MAIL_PASSWORD: '0875bbf87059c7',
};

const config = {
  development: {
    MYSQL_DB: 'node-course',
    MYSQL_USERNAME: 'root',
    MYSQL_PASSWORD: '',
  },
  production: {
    MYSQL_DB: 'node-course',
    MYSQL_USERNAME: 'root',
    MYSQL_PASSWORD: '',
  },
};

const getENV = (env) => config[env];

export const constants = {
  ...defaultConfig,
  ...getENV(process.env.NODE_ENV),
};
