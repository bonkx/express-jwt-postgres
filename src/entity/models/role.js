const Sequelize = require('sequelize');

module.exports = function Role(sequelize, DataTypes) {
    const Model = sequelize.define(
        'Role',
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
        },
    );

    return Model;
};
