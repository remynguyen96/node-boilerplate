const ProductModel = (sequelize, DataTypes) => {
    const Product = sequelize.define('Products', {
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
    return Product;
}


ProductModel.test = function() {
    console.log('okok');
    console.log(this.name);
    console.log(this.description);
    return 'foo';
};

ProductModel.prototype.testPrototype = function() {
    return 'foo';
}

export default ProductModel;
