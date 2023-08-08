const express = require("express");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const YAML = require("yamljs");

//swagger yaml setup
const file = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

const app = express();

//middlewares
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());

//routes
app.get("/api/v1/", (req, res) => {
  res.status(200).json("Hello user");
});

//app export
module.exports = app;
