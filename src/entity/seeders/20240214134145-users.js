/* eslint-disable no-unused-vars */
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        // return queryInterface.bulkInsert('users', [
        //     {
        //         username: 'admin',
        //         email: 'admin@admin.com',
        //         first_name: 'Admin',
        //         last_name: 'Adm',
        //         phone_number: '+6281234567890',
        //         password: bcrypt.hashSync(process.env.ADMIN_PASS, 12),
        //         active: true,
        //         role: 'admin,
        //         created_at: new Date(),
        //         updated_at: new Date(),
        //     },
        // ]);
    },

    async down(queryInterface, Sequelize) {
        // return await queryInterface.dropTable('users', { restartIdentity: true });
        // return queryInterface.bulkDelete('users', { username: 'admin' }, {});
    },
};
