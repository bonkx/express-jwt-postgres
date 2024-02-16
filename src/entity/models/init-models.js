var DataTypes = require('sequelize').DataTypes;
var _profiles = require('./profile');
var _refresh_token = require('./refresh_token');
var _roles = require('./role');
var _todos = require('./todo.js');
var _users = require('./user');

function initModels(sequelize) {
    var profiles = _profiles(sequelize, DataTypes);
    var refresh_token = _refresh_token(sequelize, DataTypes);
    var roles = _roles(sequelize, DataTypes);
    var todos = _todos(sequelize, DataTypes);
    var users = _users(sequelize, DataTypes);

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
