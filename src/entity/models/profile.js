const Sequelize = require('sequelize');

module.exports = function Profile(sequelize, DataTypes) {
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

    Model.associate = (models) => {
        Model.belongsTo(models.User);
    };

    return Model;
};

// const { Model } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//     class Profile extends Model {
//         /**
//          * Helper method for defining associations.
//          * This method is not a part of Sequelize lifecycle.
//          * The `models/index` file will call this method automatically.
//          */
//         static associate(models) {
//             // define association here
//             Profile.belongsTo(models.User);
//         }
//     }
//     Profile.init(
//         {
//             bio: {
//                 type: DataTypes.TEXT,
//                 allowNull: false,
//             },
//             birthday: {
//                 type: DataTypes.DATE,
//                 allowNull: true,
//             },
//         },
//         {
//             sequelize,
//             modelName: 'Profile',
//             tableName: 'profile',
//             timestamps: true,
//             underscored: true,
//         },
//     );

//     return Profile;
// };
