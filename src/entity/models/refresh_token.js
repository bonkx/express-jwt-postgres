const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    const Model = sequelize.define(
        'RefreshToken',
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
            tableName: 'refresh_token',
            timestamps: true,
            underscored: true,
        },
    );

    Model.associate = function (models) {
        Model.belongsTo(models.User);
    };

    return Model;
};
