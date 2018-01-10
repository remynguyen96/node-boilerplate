
const ProductModel = (sequelize, DataTypes) => {
    const Products = sequelize.define('products', {
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
        },
        images: {
            type: DataTypes.STRING(),
        },
        description: {
            type: DataTypes.TEXT('tiny'),
        },
    }, {
        timestamps: true,
        // getterMethods: {
        //     test() {
        //         console.log(this.price);
        //     }
        // },
        setterMethods: {
          test(val) {
              this.setDataValue('price', val);
          }
        },
    });

    Products.testClass = function() {
        console.log(this.price);
        return this;
    };

    Products.prototype.testPrototype = function() {
        return 'foo';
    }

    Products.associate = (models) => {
        models.Products.belongsTo(models.Users, {
            // onDelete
            foreignKey: {
                allowNull: false,
            },
        })
    };

    return Products;
}




export default ProductModel;
