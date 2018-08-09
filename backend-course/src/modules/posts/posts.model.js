const PostModels = (sequelize, DataTypes) => {
  const Posts = sequelize.define('post', {
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      set(val) {
        this.setDataValue('title', val);
      },
      get() {
        return this.getDataValue('title');
      },
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
      set(val) {
        this.setDataValue('slug', val.toLowerCase());
      },
    },
    images: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT('tiny'),
      allowNull: true,
    },
  }, {
    timestamps: true,
  });

  Posts.associate = (models) => {
    models.Posts.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Posts;
};


export default PostModels;
