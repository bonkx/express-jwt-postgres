const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "roles", deps: []
 * createTable "users", deps: [roles]
 * createTable "profiles", deps: [users]
 * createTable "refresh_token", deps: [users]
 * createTable "todos", deps: [users]
 *
 * */

const info = {
    revision: 1,
    name: 'init',
    created: '2024-02-16T16:37:00.566Z',
    comment: '',
};

const migrationCommands = function (transaction) {
    return [{
        fn: 'createTable',
        params: [
            'roles',
            {
                id: {
                    type: Sequelize.INTEGER,
                    field: 'id',
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: false,
                },
                name: {
                    type: Sequelize.STRING(50),
                    field: 'name',
                    allowNull: false,
                },
                label: {
                    type: Sequelize.STRING(50),
                    field: 'label',
                    allowNull: false,
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
            },
            {
                transaction,
            },
        ],
    },
    {
        fn: 'createTable',
        params: [
            'users',
            {
                id: {
                    type: Sequelize.INTEGER,
                    field: 'id',
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: false,
                },
                username: {
                    type: Sequelize.STRING(255),
                    field: 'username',
                    unique: true,
                    allowNull: false,
                },
                email: {
                    type: Sequelize.STRING(255),
                    field: 'email',
                    unique: true,
                    allowNull: false,
                },
                first_name: {
                    type: Sequelize.STRING(255),
                    field: 'first_name',
                    allowNull: false,
                },
                last_name: {
                    type: Sequelize.STRING(255),
                    field: 'last_name',
                    allowNull: false,
                },
                phone_number: {
                    type: Sequelize.STRING(255),
                    field: 'phone_number',
                    unique: true,
                    allowNull: false,
                },
                last_login: {
                    type: Sequelize.DATE,
                    field: 'last_login',
                    allowNull: true,
                },
                password: {
                    type: Sequelize.STRING(255),
                    field: 'password',
                    allowNull: false,
                },
                active: {
                    type: Sequelize.BOOLEAN,
                    field: 'active',
                    defaultValue: false,
                    allowNull: false,
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
                deletedAt: {
                    type: Sequelize.DATE,
                    field: 'deleted_at',
                },
                role_id: {
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
            },
            {
                transaction,
            },
        ],
    },
    {
        fn: 'createTable',
        params: [
            'profiles',
            {
                id: {
                    type: Sequelize.INTEGER,
                    field: 'id',
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: false,
                },
                bio: {
                    type: Sequelize.TEXT,
                    field: 'bio',
                    allowNull: false,
                },
                birthday: {
                    type: Sequelize.DATE,
                    field: 'birthday',
                    allowNull: true,
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
    },
    {
        fn: 'createTable',
        params: [
            'refresh_token',
            {
                id: {
                    type: Sequelize.INTEGER,
                    field: 'id',
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: false,
                },
                hashed_token: {
                    type: Sequelize.TEXT,
                    field: 'hashed_token',
                    allowNull: false,
                },
                revoked: {
                    type: Sequelize.BOOLEAN,
                    field: 'revoked',
                    defaultValue: false,
                    allowNull: false,
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
    },
    {
        fn: 'createTable',
        params: [
            'todos',
            {
                id: {
                    type: Sequelize.INTEGER,
                    field: 'id',
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: false,
                },
                task: {
                    type: Sequelize.STRING(255),
                    field: 'task',
                    allowNull: true,
                },
                due_date: {
                    type: Sequelize.DATE,
                    field: 'due_date',
                    allowNull: true,
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
    },
    ];
};
const rollbackCommands = function (transaction) {
    return [{
        fn: 'dropTable',
        params: ['profiles', {
            transaction,
        }],
    },
    {
        fn: 'dropTable',
        params: ['refresh_token', {
            transaction,
        }],
    },
    {
        fn: 'dropTable',
        params: ['roles', {
            transaction,
        }],
    },
    {
        fn: 'dropTable',
        params: ['todos', {
            transaction,
        }],
    },
    {
        fn: 'dropTable',
        params: ['users', {
            transaction,
        }],
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
