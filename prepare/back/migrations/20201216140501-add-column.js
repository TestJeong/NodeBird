"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      "Users", // name of Target model
      "influencer", // name of the key we're adding
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }
    );

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
      "Users", // name of the Target model
      "influencer" // key we want to remove
    );
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
