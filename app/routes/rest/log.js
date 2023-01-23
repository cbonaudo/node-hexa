const { EmptyMessageError } = require("../../domain/errors");

// TODO: find a way to streamline the handling of different errors
module.exports = (logContext) => {
  const router = require("express").Router();

  router.post("/", async (req, res) => {
    try {
      const data = await logContext.create(req.body);
      res.send(data);
    } catch (e) {
      if (e instanceof EmptyMessageError) {
        res.status(400).send({
          message: "Message can not be empty!",
        });
      } else {
        res.status(500).send({
          message: "Some error occurred while creating the Log.",
        });
      }
    }
  });

  router.get("/", async (req, res) => {
    try {
      const data = await logContext.findAll(req.query);
      res.send(data);
    } catch (e) {
      res.status(500).send({
        message: "Some error occurred while retrieving logs.",
      });
    }
  });

  router.delete("/", async (req, res) => {
    try {
      const data = await logContext.deleteAll(req.query);
      res.send(data);
    } catch (e) {
      res.status(500).send({
        message: "Some error occurred while retrieving logs.",
      });
    }
  });

  return router;
};
