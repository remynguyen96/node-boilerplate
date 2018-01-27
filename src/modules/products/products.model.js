const ProductModel = (sequelize, DataTypes) => {
    const Products = sequelize.define('product', {
        name: {
            type: DataTypes.STRING(120),
            allowNull: false,
            set(val) {
                this.setDataValue('name', val.toUpperCase());
            },
            get() {
                return this.getDataValue('name');
            },
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        images: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT('tiny'),
            allowNull: true,
        },
    }, {
        timestamps: true,
        // getterMethods: {
        //     test() {
        //         console.log(this.price);
        //     },
        // },
        setterMethods: {
          test(val) {
              this.setDataValue('price', val);
          },
        },
    });

    Products.prototype.max = (price) => price;

    Products.associate = (models) => {
        models.Products.belongsTo(models.Users, {
            foreignKey: {
                allowNull: false,
            },
        });
    };

    return Products;
};

export default ProductModel;
