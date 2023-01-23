const EmptyMessageError = require("../errors").EmptyMessageError;

class LogContext {
  constructor(logAdapter) {
    this.logAdapter = logAdapter;
  }

  create = (body) => {
    if (!body.message) {
      throw new EmptyMessageError();
    }

    const log = {
      message: body.message,
      level: body.level || "INFO",
    };

    return this.logAdapter
      .create(log)
      .then((data) => data)
      .catch(() => {
        throw new Error();
      });
  };

  findAll = (query) => {
    const level = query.level;

    return this.logAdapter
      .findAll({ level })
      .then((data) => data)
      .catch(() => {
        throw new Error();
      });
  };

  deleteAll = () => {
    return this.logAdapter
      .deleteAll()
      .then((nums) => ({
        message: `${nums} Logs were deleted successfully!`
      }))
      .catch((err) => {
        throw new Error();
      });
  };
}

module.exports = LogContext;
