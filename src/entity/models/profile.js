const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    const Profile = sequelize.define(
        'Profile',
        {
            bio: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            birthday: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: 'profiles',
            timestamps: true,
            underscored: true,
        }
    );

    Profile.associate = function (models) {
        Profile.belongsTo(models.users);
    };

    return Profile;
};
