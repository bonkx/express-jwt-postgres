/* eslint-disable func-names */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-spread */
/* eslint-disable no-shadow */
const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "products", deps: [users]
 *
 * */

const info = {
    revision: 2,
    name: 'products',
    created: '2024-02-16T17:01:36.750Z',
    comment: '',
};

const migrationCommands = function (transaction) {
    return [{
        fn: 'createTable',
        params: [
            'products',
            {
                id: {
                    type: Sequelize.INTEGER,
                    field: 'id',
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: false,
                },
                name: {
                    type: Sequelize.STRING,
                    field: 'name',
                },
                description: {
                    type: Sequelize.STRING,
                    field: 'description',
                },
                price: {
                    type: Sequelize.FLOAT,
                    field: 'price',
                },
                createdAt: {
                    type: Sequelize.DATE,
                    field: 'created_at',
                    allowNull: false,
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    field: 'updated_at',
                    allowNull: false,
                },
                UserId: {
                    type: Sequelize.INTEGER,
                    field: 'user_id',
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL',
                    references: {
                        model: 'users',
                        key: 'id',
                    },
                    allowNull: true,
                },
            },
            {
                transaction,
            },
        ],
    }];
};
const rollbackCommands = function (transaction) {
    return [{
        fn: 'dropTable',
        params: ['products', {
            transaction,
        }],
    }];
};

module.exports = {
    pos: 0,
    useTransaction: true,
    execute(queryInterface, Sequelize, _commands) {
        let index = this.pos;
        function run(transaction) {
            const commands = _commands(transaction);
            return new Promise((resolve, reject) => {
                function next() {
                    if (index < commands.length) {
                        const command = commands[index];
                        console.log(`[#${index}] execute: ${command.fn}`);
                        index++;
                        queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                    } else resolve();
                }
                next();
            });
        }
        if (this.useTransaction) {
            return queryInterface.sequelize.transaction(run);
        }
        return run(null);
    },
    up(queryInterface, Sequelize) {
        return this.execute(queryInterface, Sequelize, migrationCommands);
    },
    down(queryInterface, Sequelize) {
        return this.execute(queryInterface, Sequelize, rollbackCommands);
    },
    info,
};
