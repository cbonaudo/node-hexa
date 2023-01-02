const dbConfig = require("../../config/db.js");

const Sequelize = require("sequelize");
const { initSequelize } = require("./sqlInit");

const db = initSequelize(dbConfig);

db.logs = db.sequelize.define("log", {
  message: {
    type: Sequelize.STRING,
  },
  level: {
    type: Sequelize.STRING,
  },
});

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

module.exports = db.logs;
