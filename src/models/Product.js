export default (sequelize, DataTypes) => {
    const Product = sequelize.define('Products', {
        name: {
            type: DataTypes.STRING(120),
            allowNull: false,
            set(val) {
                this.setDataValue('name', val.toUpperCase());
            }
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
    });
    return Product;
}