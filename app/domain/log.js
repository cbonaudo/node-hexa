const Log = require("../sec_adapters/logs");
// TODO: sec adapters should handle the Op
const Op = require("sequelize").Op;

// TODO: Log as a prop of LogContext
// TODO: should throw or return the result, and pri adapter should send the rest message

LogContext = {
  create: (req, res) => {
    if (!req.body.message) {
      res.status(400).send({
        message: "Message can not be empty!",
      });
      return;
    }

    const log = {
      message: req.body.message,
      level: req.body.level || "INFO",
    };

    Log.create(log)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Log.",
        });
      });
  },

  findAll: (req, res) => {
    const level = req.query.level;
    var condition = level ? { level: { [Op.eq]: level } } : null;

    Log.findAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving logs.",
        });
      });
  },

  deleteAll: (req, res) => {
    Log.destroy({
      where: {},
      truncate: false,
    })
      .then((nums) => {
        res.send({ message: `${nums} Logs were deleted successfully!` });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all logs.",
        });
      });
  },
};

module.exports = LogContext;
