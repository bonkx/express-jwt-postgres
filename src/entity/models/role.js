const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.User, { as: 'users', foreignKey: 'role_id' });
        }
    }
    Role.init(
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

    return Role;
};
