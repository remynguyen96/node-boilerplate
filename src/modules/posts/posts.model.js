export default (sequelize, DataTypes) => {
    const Posts = sequelize.define('posts', {
        title: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING(180),
            allowNull: false,
        },
        description: DataTypes.TEXT,
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: true,
        validate: {
            bothCoordsOrNone() {
                const regx = /^[^(!@#$%^&*()_.,<>?'";)]{5,60}$/g;
                // regx.test(title);
                if ((this.title === null) || (this.slug === null)) {
                    throw new Error('Require either both latitude and longitude or neither')
                }
            }
        },
        getterMethods: {
            fullName() {
                return this.title + ' ' + this.slug
            }
        },
    });
    // Post.prototype.testTitleUppercase = (models) => {
    //     console.log(models);
    // }
    Posts.associate = (models) => {
        models.Posts.belongsTo(models.Users, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Posts;
}
