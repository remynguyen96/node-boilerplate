import Sequelize from 'sequelize';
import constants from '../config/constants';

const configDB = {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    protocol: null,
    logging: false,
    //disable inserting undefined values as NULL
    omitNull: false,
    operatorsAliases: false,
    // similar for sync: you can define this to always force sync for models
    sync: { force: false },
    define: {
        //don't use camelcase for automatically
        underscored: false,
        // disable the modification of table names;
        freezeTableName: false,
        charset: 'utf8',
        dialectOptions: {
            collate: 'utf8_general_ci'
        },
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 60000,
        idle: 30000
    },
};

const sequelize = new Sequelize(
                    constants.MYSQL_DB,
                    constants.MYSQL_USERNAME,
                    constants.MYSQL_PASSWORD,
                    configDB);
const db = {
    User: sequelize.import('./User'),
    Post: sequelize.import('./Post'),
    Product: sequelize.import('./Product'),
};
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;

// const project = db.Post.build({
//     title: 'my awesome project',
//     slug: 'my-awesome-project',
//     description: 'woot woot. this will make me a rich man'
// });

// project.save().then(() => {
//   console.log('save ok !!!');
// }).catch(error => {
//     Ooops, do some error-handling
    // console.log(error);
// });

export default db;
