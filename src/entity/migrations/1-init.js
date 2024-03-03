'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "users", deps: []
 * createTable "products", deps: [users, users]
 * createTable "profiles", deps: [users]
 * createTable "refresh_tokens", deps: [users, users]
 * createTable "todos", deps: [users, users]
 *
 **/

var info = {
    "revision": 1,
    "name": "init",
    "created": "2024-03-03T10:28:34.377Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "createTable",
            params: [
                "users",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "username": {
                        "type": Sequelize.STRING(255),
                        "field": "username",
                        "unique": true,
                        "allowNull": false
                    },
                    "email": {
                        "type": Sequelize.STRING(255),
                        "field": "email",
                        "unique": true,
                        "allowNull": false
                    },
                    "first_name": {
                        "type": Sequelize.STRING(255),
                        "field": "first_name",
                        "allowNull": false
                    },
                    "last_name": {
                        "type": Sequelize.STRING(255),
                        "field": "last_name",
                        "allowNull": false
                    },
                    "phone_number": {
                        "type": Sequelize.STRING(255),
                        "field": "phone_number",
                        "unique": true,
                        "allowNull": false
                    },
                    "last_login": {
                        "type": Sequelize.DATE,
                        "field": "last_login",
                        "allowNull": true
                    },
                    "password": {
                        "type": Sequelize.STRING(255),
                        "field": "password",
                        "allowNull": false
                    },
                    "active": {
                        "type": Sequelize.BOOLEAN,
                        "field": "active",
                        "defaultValue": false,
                        "allowNull": false
                    },
                    "role": {
                        "type": Sequelize.ENUM('admin', 'staff', 'member'),
                        "field": "role",
                        "defaultValue": "member"
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updated_at",
                        "allowNull": false
                    },
                    "deletedAt": {
                        "type": Sequelize.DATE,
                        "field": "deleted_at"
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "products",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "name": {
                        "type": Sequelize.STRING,
                        "field": "name"
                    },
                    "description": {
                        "type": Sequelize.STRING,
                        "field": "description"
                    },
                    "price": {
                        "type": Sequelize.FLOAT,
                        "field": "price"
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updated_at",
                        "allowNull": false
                    },
                    "user_id": {
                        "type": Sequelize.INTEGER,
                        "field": "user_id",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "users",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "UserId": {
                        "type": Sequelize.INTEGER,
                        "field": "user_id",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "users",
                            "key": "id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "profiles",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "bio": {
                        "type": Sequelize.TEXT,
                        "field": "bio",
                        "allowNull": false
                    },
                    "birthday": {
                        "type": Sequelize.DATE,
                        "field": "birthday",
                        "allowNull": true
                    },
                    "image": {
                        "type": Sequelize.STRING(255),
                        "field": "image",
                        "allowNull": true
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updated_at",
                        "allowNull": false
                    },
                    "user_id": {
                        "type": Sequelize.INTEGER,
                        "field": "user_id",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "users",
                            "key": "id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "refresh_tokens",
                {
                    "id": {
                        "type": Sequelize.UUID,
                        "field": "id",
                        "primaryKey": true,
                        "allowNull": false,
                        "defaultValue": Sequelize.UUIDV4
                    },
                    "hashed_token": {
                        "type": Sequelize.TEXT,
                        "field": "hashed_token",
                        "allowNull": false
                    },
                    "revoked": {
                        "type": Sequelize.BOOLEAN,
                        "field": "revoked",
                        "defaultValue": false,
                        "allowNull": false
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updated_at",
                        "allowNull": false
                    },
                    "user_id": {
                        "type": Sequelize.INTEGER,
                        "field": "user_id",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "users",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "UserId": {
                        "type": Sequelize.INTEGER,
                        "field": "user_id",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "users",
                            "key": "id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "todos",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "task": {
                        "type": Sequelize.STRING(255),
                        "field": "task",
                        "allowNull": true
                    },
                    "due_date": {
                        "type": Sequelize.DATE,
                        "field": "due_date",
                        "allowNull": true
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updated_at",
                        "allowNull": false
                    },
                    "user_id": {
                        "type": Sequelize.INTEGER,
                        "field": "user_id",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "users",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "UserId": {
                        "type": Sequelize.INTEGER,
                        "field": "user_id",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "users",
                            "key": "id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "dropTable",
            params: ["products", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["profiles", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["refresh_tokens", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["todos", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["users", {
                transaction: transaction
            }]
        }
    ];
};

module.exports = {
    pos: 0,
    useTransaction: true,
    execute: function(queryInterface, Sequelize, _commands)
    {
        var index = this.pos;
        function run(transaction) {
            const commands = _commands(transaction);
            return new Promise(function(resolve, reject) {
                function next() {
                    if (index < commands.length)
                    {
                        let command = commands[index];
                        console.log("[#"+index+"] execute: " + command.fn);
                        index++;
                        queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                    }
                    else
                        resolve();
                }
                next();
            });
        }
        if (this.useTransaction) {
            return queryInterface.sequelize.transaction(run);
        } else {
            return run(null);
        }
    },
    up: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, migrationCommands);
    },
    down: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, rollbackCommands);
    },
    info: info
};
