import {hashSync} from 'bcrypt-nodejs';

const UserModel = (sequelize, DataTypes) => {
    const Users = sequelize.define('users', {
        name: {
            type: DataTypes.STRING(120),
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Name is field required !',
                },
                checkName(value) {
                    const Regex = /^(?!.*[!@#$%^&*()_+=])(?!.*[0-9])[a-zA-Z].{3,30}$/g;
                    if (!Regex.test(value)) {
                        throw new Error('Name is not match !');
                    };
                },
            },
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(120),
            unique: {msg: 'Email address already in taken !'},
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true,
                max: 120,
                min: 8,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password_hash: {
            type: DataTypes.VIRTUAL,
            set: function(val) {
                this.setDataValue('password_hash', val);
                this.setDataValue('password', hashSync(val));
            },
            validate: {
                isLongEnough: (val) => {
                    if (val.length < 5) {
                        throw new Error('Please choose a longer password');
                    }
                },
            },
        },
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT('tiny'),
        },
    }, {
        // tableName: 'users',
        timestamps: true,
    });

    Users.associate = (models) => {
        models.Users.hasMany(models.Posts);
        models.Users.hasMany(models.Products);
    };
    return Users;
};

UserModel.prototype.test = () => {
    console.log('good test !');
    // console.log(this.name);
};

export default UserModel;

