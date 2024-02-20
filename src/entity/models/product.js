const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
        }
    }
    Product.init(
        {
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            price: DataTypes.FLOAT,
        },
        {
            sequelize,
            tableName: 'products',
            timestamps: true,
            underscored: true,
        },
    );

    return Product;
};
