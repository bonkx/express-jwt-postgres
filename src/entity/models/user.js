const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define(
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
        }
    );

    User.associate = function (models) {
        User.belongsTo(models.roles, {
            foreignKey: {
                name: 'role_id',
            },
        });
        User.hasOne(models.profiles, {
            onDelete: 'CASCADE',
        });
        User.hasMany(models.todos, {
            onDelete: 'CASCADE',
        });
        User.hasMany(models.refresh_token, {
            onDelete: 'CASCADE',
        });
    };

    return User;
};
