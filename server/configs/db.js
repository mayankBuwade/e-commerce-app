const mongoose = require("mongoose");

const ConnectWithDB = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("connected to database");
    })
    .catch((error) => {
      console.log("issue with database");
      console.log(error);
      process.exit(1);
    });
};

module.exports = ConnectWithDB;
