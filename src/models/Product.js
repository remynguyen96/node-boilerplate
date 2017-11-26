export default (sequelize, DataTypes) => {
    const Product = sequelize.define('Products', {
        name: {
            type: DataTypes.STRING(120),
            set(val) {
                this.setDataValue('name', val.toUpperCase());
            }
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT('tiny'),
        },
    }, {
        timestamps: true,
    });
    return Product;
}