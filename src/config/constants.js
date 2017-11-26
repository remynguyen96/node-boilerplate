const defaultConfig = {
    PORT: process.env.PORT || 4500
};

const config = {
    development: {
        MONGO_URL: 'mongodb://localhost:27017/boilerplate',

        MYSQL_DB: 'node-boilerplate',
        MYSQL_USERNAME: 'root',
        MYSQL_PASSWORD: '',

        JWT_SECRET: 'understanding mediation',
        JWT_SECRET2: 'Vipassana',

        PASSPORTCODE: 'I-LOVE-MOM',
        IV: '#base64IV#',

        MAIL_HOST: 'smtp.mailtrap.io',
        MAIL_PORT: '2525',
        MAIL_USERNAME: 'a1285327665551',
        MAIL_PASSWORD: '0875bbf87059c7',
    },
    production: {
        MONGO_URL: 'mongodb://localhost/node-boilerplate'
    }
};

function getENV(env) {
    return config[env];
}

export default {
    ...defaultConfig,
    ...getENV(process.env.NODE_ENV),
}