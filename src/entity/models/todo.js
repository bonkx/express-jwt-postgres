const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    const Model = sequelize.define(
        'Todo',
        {
            task: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            due_date: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: 'todos',
            timestamps: true,
            underscored: true,
        },
    );

    Model.associate = function (models) {
        Model.belongsTo(models.User);
    };

    return Model;
};
