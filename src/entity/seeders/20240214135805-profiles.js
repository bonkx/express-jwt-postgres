/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        // return queryInterface.bulkInsert('profiles', [
        //     {
        //         user_id: 1,
        //         bio: 'Admin System',
        //         created_at: new Date(),
        //         updated_at: new Date(),
        //     },
        // ]);
    },

    async down(queryInterface, Sequelize) {
        // return await queryInterface.dropTable('profiles', { restartIdentity: true });
        // return queryInterface.bulkDelete('profiles', null, {});
    },
};
