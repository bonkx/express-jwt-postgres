const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Todo extends Model {
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
    Todo.init(
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

    return Todo;
};
