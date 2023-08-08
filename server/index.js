const app = require("./app");
const ConnectWithDB = require("./configs/db");
require("dotenv").config();

//database connection
ConnectWithDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is connecter at port ${process.env.PORT}`);
});
