const Sequelize = require('sequelize');

module.exports = function User(sequelize, DataTypes) {
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
        },
    );

    Model.associate = (models) => {
        Model.belongsTo(models.Role, {
            foreignKey: {
                name: 'role_id',
            },
        });
        // Model.hasOne(models.Profile, {
        //     onDelete: 'CASCADE',
        // });
        // Model.hasMany(models.Todo, {
        //     onDelete: 'CASCADE',
        // });
        // Model.hasMany(models.RefreshToken, {
        //     onDelete: 'CASCADE',
        // });
    };

    Model.beforeCreate(async (md) => {
        md.password = await md.generatePasswordHash();
    });

    Model.prototype.generatePasswordHash = async function () {
        const saltRounds = process.env.SALT_ROUNDS;
        return await bcrypt.hashSync(this.password, saltRounds);
    };

    return Model;
};
