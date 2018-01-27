const PostModel = (sequelize, DataTypes) => {
    const Posts = sequelize.define('post', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING(180),
            allowNull: false,
        },
        description: DataTypes.TEXT,
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: true,
        validate: {
            bothCoordsOrNone() {
                // const regx = /^[^(!@#$%^&*()_.,<>?'";)]{5,60}$/g;
                // regx.test(title);
                if ((this.title === null) || (this.slug === null)) {
                    throw new Error('Require either both latitude and longitude or neither');
                }
            },
        },
        getterMethods: {
            fullName() {
                return `${this.title}---${this.slug}`;
            },
        },
    });

    Posts.associate = (models) => {
        models.Posts.belongsTo(models.Users, {
            foreignKey: {
                allowNull: false,
                constraints: false,
            },
        });
    };

    return Posts;
};

export default PostModel;
