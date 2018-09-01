const Sequelize = require('sequelize');

const configDB = {
  host: process.argv[2] || 'localhost',
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
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_ROOT_PASSWORD,
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