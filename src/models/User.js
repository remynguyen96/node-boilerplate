export default (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        name: DataTypes.STRING(120),
        email: {
            type: DataTypes.STRING(120),
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
                max: 120,
                min: 8,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING,
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
}

