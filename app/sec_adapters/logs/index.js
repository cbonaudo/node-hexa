const dbConfig = require("../../config/db.js");

const Sequelize = require("sequelize");
const { initSequelize } = require("./sqlInit");
const Op = Sequelize.Op;

class SQLLogAdapter {
  constructor() {
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

    this.db = db;
  }

  deleteAll = () => {
    return this.db.logs.destroy({
      where: {},
      truncate: false,
    });
  };

  create = ({ message, level }) => {
    return this.db.logs.create({ message, level });
  };

  findAll = ({ level }) => {
    const condition = level ? { level: { [Op.eq]: level } } : null;

    return this.db.logs.findAll({ where: condition });
  };
}

module.exports = new SQLLogAdapter();
