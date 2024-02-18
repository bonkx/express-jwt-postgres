/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */

const { generatePasswordHash } = require('@src/utils/salt');

module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
        'User',
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
            defaultScope: {
                attributes: {
                    exclude: ['password'],
                },
            },
            hooks: {
                beforeCreate: async (record, options) => {
                    record.dataValues.password = await generatePasswordHash(
                        record.dataValues.password,
                    );
                },
                beforeUpdate: (record, options) => {
                },
            },
        },
    );

    return Model;
};
