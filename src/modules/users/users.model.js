import {hashSync, compareSync} from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import constants from '../../config/constants';

const UserModel = (sequelize, DataTypes) => {
    const Users = sequelize.define('users', {
        name: {
            type: DataTypes.STRING(120),
            allowNull: false,
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
        },
        email: {
            type: DataTypes.STRING(120),
            allowNull: false,
            unique: {msg: 'Email address already in taken !'},
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
            allowNull: true,
            set: function(val) {
                this.setDataValue('passClient', val);
                this.setDataValue('password', hashSync(val));
            },
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Password is field required !',
                },
                isLongEnough(val) {
                    if (`${val}`.length < 5) {
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
        avatar: {
            type: DataTypes.STRING(),
            allowNull: true,
            validate: {
                checkImage(img) {
                    if (!img.match(/\.(png|jpg|jpeg|gif|svg)$/)) {
                        throw new Error('Image is not match !');
                    };
                },
            },
        },
        intro: {
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
            {id},
            constants.JWT_SECRET,
            {expiresIn: '5m'}
        )
    );

    Users.comparePassword = (passNew, passOld) => (compareSync(passNew, passOld));
    Users.toAuthJSON = ({id, name, email, intro, avatar}) => ({
        id,
        name,
        email,
        avatar,
        intro,
        token: `JWT ${Users.createToken(id)}`,
    });
    return Users;
};

// UserModel.prototype.test = () => {
    // console.log('good test !');
    // console.log(this.name);
// };

export default UserModel;

