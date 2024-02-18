/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.js`)[env];
const db = {};

let sequelize;
if (config.url) {
    // console.log(config.url);
    sequelize = new Sequelize(config.url, config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js' && file.indexOf('.test.js') === -1)
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// ## Associations
db.User.belongsTo(db.Role, { as: 'role', foreignKey: 'role_id' });
db.Role.hasMany(db.User, { as: 'users', foreignKey: 'role_id' });
db.Profile.belongsTo(db.User, { as: 'user', foreignKey: 'user_id' });
db.User.hasOne(db.Profile, { as: 'profile', foreignKey: 'user_id' });
db.RefreshToken.belongsTo(db.User, { as: 'user', foreignKey: 'user_id' });
db.User.hasMany(db.RefreshToken, { as: 'refresh_tokens', foreignKey: 'user_id' });
db.Todo.belongsTo(db.User, { as: 'user', foreignKey: 'user_id' });
db.User.hasMany(db.Todo, { as: 'todos', foreignKey: 'user_id' });

// db.sequelize
//     // .sync({ force: true })
//     // .drop()
//     .then(() => {
//         console.log('============== Synced DB ==============');
//     })
//     .catch((err) => {
//         console.log(`Failed to sync db: ${err.message}`);
//     });

module.exports = db;
