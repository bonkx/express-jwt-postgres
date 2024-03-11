/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OTPRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            // define association here
        }
    }
    OTPRequest.init({
        email: DataTypes.STRING,
        otp: DataTypes.STRING(6),
        expired_at: DataTypes.DATE,
        is_used: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {
        sequelize,
        tableName: 'otp_requests',
        underscored: true,
        hooks: {
            beforeCreate: async (record, options) => {
                const todayDate = new Date();
                const nextDay = todayDate.setDate(todayDate.getMinutes() + 15);
                record.dataValues.expired_at = nextDay;
            },
            beforeUpdate: (record, options) => {
            },
        },
    });
    return OTPRequest;
};
