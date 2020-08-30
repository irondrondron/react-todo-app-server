const Sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'todo',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      // primaryKey: true,
      // autoIncrement: true,
    },
    text: {
      type: Sequelize.STRING,
    },
    complete: {
      type: Sequelize.BOOLEAN,
    },
  },
  {
    timestamps: false,
  }
);
