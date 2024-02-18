/* eslint-disable func-names */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-spread */
/* eslint-disable no-shadow */
const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "user_id" from table "products"
 * removeColumn "user_id" from table "profiles"
 * removeColumn "user_id" from table "refresh_token"
 * removeColumn "user_id" from table "todos"
 * addColumn "user_id" to table "profiles"
 * addColumn "user_id" to table "refresh_token"
 * addColumn "user_id" to table "todos"
 * changeColumn "role_id" on table "users"
 *
 * */

const info = {
    revision: 3,
    name: 'noname',
    created: '2024-02-18T05:36:20.678Z',
    comment: '',
};

const migrationCommands = function (transaction) {
    return [{
        fn: 'removeColumn',
        params: [
            'products',
            'user_id',
            {
                transaction,
            },
        ],
    },
    {
        fn: 'removeColumn',
        params: [
            'profiles',
            'user_id',
            {
                transaction,
            },
        ],
    },
    {
        fn: 'removeColumn',
        params: [
            'refresh_token',
            'user_id',
            {
                transaction,
            },
        ],
    },
    {
        fn: 'removeColumn',
        params: [
            'todos',
            'user_id',
            {
                transaction,
            },
        ],
    },
    {
        fn: 'addColumn',
        params: [
            'profiles',
            'user_id',
            {
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
            {
                transaction,
            },
        ],
    },
    {
        fn: 'addColumn',
        params: [
            'refresh_token',
            'user_id',
            {
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
            {
                transaction,
            },
        ],
    },
    {
        fn: 'addColumn',
        params: [
            'todos',
            'user_id',
            {
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
            {
                transaction,
            },
        ],
    },
    {
        fn: 'changeColumn',
        params: [
            'users',
            'role_id',
            {
                type: Sequelize.INTEGER,
                field: 'role_id',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                references: {
                    model: 'roles',
                    key: 'id',
                },
                allowNull: true,
            },
            {
                transaction,
            },
        ],
    },
    ];
};
const rollbackCommands = function (transaction) {
    return [{
        fn: 'removeColumn',
        params: [
            'profiles',
            'user_id',
            {
                transaction,
            },
        ],
    },
    {
        fn: 'removeColumn',
        params: [
            'refresh_token',
            'user_id',
            {
                transaction,
            },
        ],
    },
    {
        fn: 'removeColumn',
        params: [
            'todos',
            'user_id',
            {
                transaction,
            },
        ],
    },
    {
        fn: 'addColumn',
        params: [
            'products',
            'user_id',
            {
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
            {
                transaction,
            },
        ],
    },
    {
        fn: 'addColumn',
        params: [
            'profiles',
            'user_id',
            {
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
            {
                transaction,
            },
        ],
    },
    {
        fn: 'addColumn',
        params: [
            'refresh_token',
            'user_id',
            {
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
            {
                transaction,
            },
        ],
    },
    {
        fn: 'addColumn',
        params: [
            'todos',
            'user_id',
            {
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
            {
                transaction,
            },
        ],
    },
    {
        fn: 'changeColumn',
        params: [
            'users',
            'role_id',
            {
                type: Sequelize.INTEGER,
                field: 'role_id',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                references: {
                    model: 'roles',
                    key: 'id',
                },
                name: 'role_id',
                allowNull: true,
            },
            {
                transaction,
            },
        ],
    },
    ];
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
