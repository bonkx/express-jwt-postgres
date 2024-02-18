module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
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
        },
    );

    return Model;
};
