module.exports = (logContext) => {
  const router = require("express").Router();

  router.post("/", logContext.create);

  router.get("/", logContext.findAll);

  router.delete("/", logContext.deleteAll);

  return router;
};
