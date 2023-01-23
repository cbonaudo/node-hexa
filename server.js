const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const LogContext = require("./app/domain/log.js");
const SQLLogAdapter = require("./app/sec_adapters/logs");
const initLogRoutes = require("./app/pri_adapters/rest/log");

const corsOptions = {
  origin: "http://localhost:8081",
};
const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: const sqlLogAdapter = new SQLLogAdapter();
const sqlLogAdapter = SQLLogAdapter;
const logContext = new LogContext(sqlLogAdapter);
initLogRoutes(app, logContext);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}.`);
});

// TODO: export sec adapters for test
module.exports = { app, SQLLogAdapter };
