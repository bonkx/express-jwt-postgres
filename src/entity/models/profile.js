const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Profile extends Model {
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
    Profile.init(
        {
            bio: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            birthday: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            image: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: 'profiles',
            timestamps: true,
            underscored: true,
        },
    );

    return Profile;
};
