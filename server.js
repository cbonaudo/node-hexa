const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:8081",
};
const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const logContext = require("./app/domain/log.js");

require("./app/pri_adapters/rest/log")(app, logContext);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}.`);
});

module.exports = app;
