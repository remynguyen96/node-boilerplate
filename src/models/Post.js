export default (sequelize, DataTypes) => {
    const Post = sequelize.define('Posts', {
        title: {
            type: DataTypes.STRING(150),
            get() {
                return `${this.getDataValue('title')}--RemyNguyen`;
            }
        },
        slug: DataTypes.STRING(180),
        description: DataTypes.TEXT,
        userId: {
            type: DataTypes.INTEGER,
        },
    }, {
        timestamps: true,
        validate: {
            bothCoordsOrNone() {
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
    //     return
    // }

    Post.associate = (models) => {
        models.Post.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Post;
}