/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('roles', [
            {
                name: 'admin', label: 'ADMIN', created_at: new Date(), updated_at: new Date(),
            },
            {
                name: 'member', label: 'MEMBER', created_at: new Date(), updated_at: new Date(),
            },
            {
                name: 'staff', label: 'STAFF', created_at: new Date(), updated_at: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('roles', null, {});
    },
};
