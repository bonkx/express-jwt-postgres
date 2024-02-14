const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    const Role = sequelize.define(
        'roles',
        {
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            label: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'roles',
            timestamps: true,
            underscored: true,
        }
    );

    return Role;
};
