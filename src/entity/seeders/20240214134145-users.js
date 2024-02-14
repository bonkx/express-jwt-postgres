'use strict';

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require('bcryptjs');

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('users', [
            {
                id: 1,
                username: 'admin',
                email: 'admin@admin.com',
                first_name: 'Admin',
                last_name: 'Adm',
                phone_number: '+6281234567890',
                password: bcrypt.hashSync('P@ss4dmin', 12),
                active: true,
                role_id: 1,
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        // return await queryInterface.dropTable('users', { restartIdentity: true });
        return queryInterface.bulkDelete('users', null, {});
    },
};
