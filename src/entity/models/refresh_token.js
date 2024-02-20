const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RefreshToken extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // this.belongsTo(models.User, { as: 'user' });
            this.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
        }
    }
    RefreshToken.init(
        {
            hashed_token: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            revoked: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            sequelize,
            tableName: 'refresh_tokens',
            timestamps: true,
            underscored: true,
        },
    );

    return RefreshToken;
};
