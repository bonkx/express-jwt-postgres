const { DataTypes } = require('sequelize');
const _profiles = require('./profile');
const _refresh_token = require('./refresh_token');
const _roles = require('./role');
const _todos = require('./todo.js');
const _users = require('./user');

function initModels(sequelize) {
    const profiles = _profiles(sequelize, DataTypes);
    const refresh_token = _refresh_token(sequelize, DataTypes);
    const roles = _roles(sequelize, DataTypes);
    const todos = _todos(sequelize, DataTypes);
    const users = _users(sequelize, DataTypes);

    users.belongsTo(roles, { as: 'role', foreignKey: 'role_id' });
    roles.hasMany(users, { as: 'users', foreignKey: 'role_id' });
    profiles.belongsTo(users, { as: 'user', foreignKey: 'user_id' });
    users.hasMany(profiles, { as: 'profiles', foreignKey: 'user_id' });
    refresh_token.belongsTo(users, { as: 'user', foreignKey: 'user_id' });
    users.hasMany(refresh_token, { as: 'refresh_tokens', foreignKey: 'user_id' });
    todos.belongsTo(users, { as: 'user', foreignKey: 'user_id' });
    users.hasMany(todos, { as: 'todos', foreignKey: 'user_id' });

    return {
        profiles,
        refresh_token,
        roles,
        todos,
        users,
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
