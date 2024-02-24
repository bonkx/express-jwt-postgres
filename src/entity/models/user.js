/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */

const bcrypt = require('bcryptjs');
const { Model } = require('sequelize');
const { Role } = require('@src/utils/role');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasOne(models.Profile, { as: 'profile', foreignKey: 'user_id' });
            this.hasMany(models.RefreshToken, { as: 'refresh_tokens' });
            this.hasMany(models.Todo, { as: 'todos' });
            this.hasMany(models.Product, { as: 'products' });
        }
    }
    User.init(
        {
            username: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            first_name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            last_name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            phone_number: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
            },
            last_login: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            role: {
                type: DataTypes.ENUM,
                values: Object.values(Role),
                defaultValue: Role.Member,
            },

            /**
             * Virtual fields
             */
            name: {
                type: DataTypes.VIRTUAL,
                get() {
                    return `${this.first_name} ${this.last_name}`;
                },
                // eslint-disable-next-line no-unused-vars
                set(value) {
                    throw new Error('Do not try to set the `fullName` value!');
                },
            },
        },
        {
            sequelize,
            tableName: 'users',
            timestamps: true,
            paranoid: true,
            underscored: true,
            // defaultScope: {
            //     attributes: {
            //         exclude: ['password'],
            //     },
            // },
            scopes: {
                withoutPassword: {
                    attributes: { exclude: ['password'] },
                },
            },
            hooks: {
                beforeCreate: async (record, options) => {
                    const saltRounds = Math.floor(Math.random() * 10);
                    // eslint-disable-next-line max-len
                    record.dataValues.password = bcrypt.hashSync(record.dataValues.password, saltRounds);
                },
                beforeUpdate: (record, options) => {
                },
            },
        },
    );

    return User;
};
