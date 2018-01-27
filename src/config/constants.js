const defaultConfig = {
    PORT: process.env.PORT || 3000,
};

const config = {
    development: {
        MYSQL_DB: 'node-boilerplate',
        MYSQL_USERNAME: '',
        MYSQL_PASSWORD: '',

        JWT_SECRET: 'understanding mediation',
        JWT_SECRET2: 'take care your self',
        PASSPORTCODE: 'MED',
        EXP_TOKEN_ACCESS: '15m',
        EXP_TOKEN_REFRESH: '7 days',

        MAIL_HOST: 'smtp.mailtrap.io',
        MAIL_PORT: 2525,
        MAIL_USERNAME: '',
        MAIL_PASSWORD: '',
    },
    production: {
        MYSQL_DB: '',
        MYSQL_USERNAME: '',
        MYSQL_PASSWORD: '',
    },
};

const getENV = (env) => config[env];

export default {
    ...defaultConfig,
    ...getENV(process.env.NODE_ENV),
};
