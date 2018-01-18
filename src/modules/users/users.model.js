import {hashSync, compareSync} from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import constants from '../../config/constants';

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
                    }
                    ;
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
        passClient: {
            type: DataTypes.VIRTUAL,
            set: function(val) {
                this.setDataValue('passClient', val);
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
            allowNull: true,
        },
    }, {
        // tableName: 'users',
        timestamps: true,
    });

    Users.associate = (models) => {
        models.Users.hasMany(models.Posts);
        models.Users.hasMany(models.Products);
    };

    Users.createToken = (id) => (
        jwt.sign(
            {id: id},
            constants.JWT_SECRET,
            {expiresIn: '5m'}
        )
    );

    Users.comparePassword = (passNew, passOld) => (compareSync(passNew, passOld));
    Users.toAuthJSON = ({id, name, email, description}) => ({
        id,
        name,
        email,
        description,
        token: `JWT ${Users.createToken(id)}`,
    });
    return Users;
};

// UserModel.prototype.test = () => {
    // console.log('good test !');
    // console.log(this.name);
// };

export default UserModel;

