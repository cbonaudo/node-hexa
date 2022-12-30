// TODO: Return the router, so server.js handles it's root route and app is not needed

module.exports = (app, logContext) => {
  const router = require("express").Router();

  router.post("/", logContext.create);

  router.get("/", logContext.findAll);

  router.delete("/", logContext.deleteAll);

  app.use("/api/logs", router);
};
