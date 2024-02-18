/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('roles', [
            {
                id: 1, name: 'admin', label: 'ADMIN', created_at: new Date(), updated_at: new Date(),
            },
            {
                id: 2, name: 'member', label: 'MEMBER', created_at: new Date(), updated_at: new Date(),
            },
            {
                id: 3, name: 'staff', label: 'STAFF', created_at: new Date(), updated_at: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('roles', null, {});
    },
};
