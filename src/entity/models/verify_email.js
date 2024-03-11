/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class VerifyEmail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            // define association here
        }
    }
    VerifyEmail.init({
        email: DataTypes.STRING,
        code: DataTypes.TEXT,
        verified_at: DataTypes.DATE,
        expired_at: DataTypes.DATE,
    }, {
        sequelize,
        // modelName: 'verify_email',
        tableName: 'verify_email',
        underscored: true,
        hooks: {
            beforeCreate: async (record, options) => {
                const todayDate = new Date();
                const nextDay = todayDate.setDate(todayDate.getDate() + 1);
                record.dataValues.expired_at = nextDay;
            },
            beforeUpdate: (record, options) => {
            },
        },
    });
    return VerifyEmail;
};
