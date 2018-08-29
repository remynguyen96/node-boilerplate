const Sequelize = require('sequelize');
const { constants } = require('./constants');

const configDB = {
  host: '10.100.219.166',
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
  { ...configDB },
);

const Users = require('../modules/users/users.model')(sequelize, Sequelize);
const Posts = require('../modules/posts/posts.model')(sequelize, Sequelize);

const db = {
  Users,
  Posts,
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
