const express = require("express");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const YAML = require("yamljs");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

//all routes
const UserRoutes = require("./routes/userRoutes");

//swagger yaml setup
const file = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

const app = express();

//cors
app.use(cors());

//cookie and file middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//middlewares
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//routes
app.use("/api/v1", UserRoutes);

//app export
module.exports = app;
