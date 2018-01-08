import { hashSync } from 'bcrypt-nodejs';

const UserModel = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        name: {
            type: DataTypes.STRING(120),
            validate: {
                notEmpty:{
                    args:true,
                    msg:"Name is field required !"
                },
                checkName(value) {
                    const Regex = /^(?!.*[!@#$%^&*()_+=])(?!.*[0-9])[a-zA-Z].{3,30}$/g;
                    if (!Regex.test(value)) {
                        throw new Error('Name is not match !');
                    };
                }
            }
        },
        email: {
            type: DataTypes.STRING(120),
            unique: { msg: 'Email address already in taken !' },
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true,
                max: 120,
                min: 8,
            }
        },
        // password: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     set(pass) {
        //        this.setDataValue('password', hashSync(pass));
        //     }
        // },
        password_hash: DataTypes.STRING,
        password: {
            type: DataTypes.VIRTUAL,
            set: function (val) {
                this.setDataValue('password', val);
                this.setDataValue('password_hash', 'goodJOB' + val);
            },
            validate: {
                isLongEnough: (val) => {
                    if (val.length < 7) {
                        throw new Error("Please choose a longer password")
                    }
                }
            }
        },
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
    }, {
        tableName: 'users',
        timestamps: true,
    });

    User.associate = (models) => {
        models.User.hasMany(models.Post);
    };
    return User;
};

UserModel.prototype.test = () => {
    console.log('good test !');
    console.log(this.name);
};


export default UserModel;

