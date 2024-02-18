module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
        'RefreshToken',
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
        },
    );

    return Model;
};
