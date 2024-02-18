/* eslint-disable import/extensions */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
const { DataTypes } = require('sequelize');
const _profiles = require('./profile');
const _refresh_token = require('./refresh_token');
const _roles = require('./role');
const _todos = require('./todo.js');
const _users = require('./user');

function initModels(sequelize) {
    const Profiles = _profiles(sequelize, DataTypes);
    const RefreshToken = _refresh_token(sequelize, DataTypes);
    const Roles = _roles(sequelize, DataTypes);
    const Todos = _todos(sequelize, DataTypes);
    const Users = _users(sequelize, DataTypes);

    Users.belongsTo(Roles, { as: 'role', foreignKey: 'role_id' });
    Roles.hasMany(Users, { as: 'users', foreignKey: 'role_id' });
    Profiles.belongsTo(Users, { as: 'user', foreignKey: 'user_id' });
    Users.hasMany(Profiles, { as: 'profiles', foreignKey: 'user_id' });
    RefreshToken.belongsTo(Users, { as: 'user', foreignKey: 'user_id' });
    Users.hasMany(RefreshToken, { as: 'refresh_tokens', foreignKey: 'user_id' });
    Todos.belongsTo(Users, { as: 'user', foreignKey: 'user_id' });
    Users.hasMany(Todos, { as: 'todos', foreignKey: 'user_id' });

    return {
        Profiles,
        RefreshToken,
        Roles,
        Todos,
        Users,
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
