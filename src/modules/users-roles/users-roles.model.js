const UsersRolesModel = (sequelize, DataTypes) => {
    const UserRoles = sequelize.define('users-role', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        role_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
    }, {
        timestamps: false,
    });

    return UserRoles;
};

export default UsersRolesModel;
