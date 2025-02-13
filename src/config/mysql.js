import Sequelize from 'sequelize';
import constants from './constants';

const configDB = {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    protocol: null,
    logging: false,
    omitNull: false,
    operatorsAliases: false,
    sync: { force: true },
    define: {
        underscored: true,
        freezeTableName: false,
        charset: 'utf8',
        dialectOptions: {
            collate: 'utf8_general_ci',
        },
        timestamps: false,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 60000,
        idle: 30000,
    },
};

const sequelize = new Sequelize(
    constants.MYSQL_DB,
    constants.MYSQL_USERNAME,
    constants.MYSQL_PASSWORD,
    configDB,
);
const db = {
    Users: sequelize.import('../modules/users/users.model'),
    Roles: sequelize.import('../modules/roles/roles.model'),
    UsersRoles: sequelize.import('../modules/users-roles/users-roles.model'),
    Posts: sequelize.import('../modules/posts/posts.model'),
    Products: sequelize.import('../modules/products/products.model'),
};

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});


db.sequelize = sequelize;

export default db;
