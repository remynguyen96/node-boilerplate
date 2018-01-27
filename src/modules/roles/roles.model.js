const RolesModel = (sequelize, DataTypes) => {
    const Roles = sequelize.define('role', {
        name: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        timestamps: true,
    });

    Roles.associate = (models) => {
        models.Roles.belongsToMany(models.Users, {
            through: models.UsersRoles,
            foreignKey: 'role_id',
            allowNull: false,
        });
    };

    return Roles;
};

export default RolesModel;
