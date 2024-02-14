const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    const RefreshToken = sequelize.define(
        'refresh_token',
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
        }
    );
    return RefreshToken;
};
