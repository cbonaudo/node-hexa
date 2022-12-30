const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const LogContext = require("./app/domain/log.js");

const corsOptions = {
  origin: "http://localhost:8081",
};
const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const logAdapter = require("./app/sec_adapters/logs");
const logContext = new LogContext(logAdapter);

require("./app/pri_adapters/rest/log")(app, logContext);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}.`);
});

module.exports = app;
