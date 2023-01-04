// TODO: should throw or return the result, and pri adapter should send the rest message
class LogContext {
  constructor(logAdapter) {
    this.logAdapter = logAdapter;
  }

  create = (req, res) => {
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

    this.logAdapter
      .create(log)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Log.",
        });
      });
  };

  findAll = (req, res) => {
    const level = req.query.level;

    this.logAdapter
      .findAll({ level })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving logs.",
        });
      });
  };

  deleteAll = (req, res) => {
    this.logAdapter
      .deleteAll()
      .then((nums) => {
        res.send({ message: `${nums} Logs were deleted successfully!` });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all logs.",
        });
      });
  };
}

module.exports = LogContext;
