const Sequelize = require("sequelize");

const initSequelize = (config) => {
  const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    // TODO: remove if no pb
    // operatorsAliases: false,

    logging: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
    },
  });
  return { Sequelize, sequelize };
};

module.exports = { initSequelize };
