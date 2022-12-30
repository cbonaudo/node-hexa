module.exports = (app) => {
  const logs = require("../../domain/log.js");

  const router = require("express").Router();

  router.post("/", logs.create);

  router.get("/", logs.findAll);

  router.delete("/", logs.deleteAll);

  app.use("/api/logs", router);
};
