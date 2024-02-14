const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    const Todo = sequelize.define(
        'todos',
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
        }
    );

    return Todo;
};
