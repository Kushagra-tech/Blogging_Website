require("dotenv").config();
const serverSetup = require("./server");
const dbConnection = require("./src/config/db");
const PORT = process.env.PORT;
dbConnection()
  .then(() => {
    serverSetup().listen(PORT, () => console.log("Listening at :", PORT));
  })
  .catch((error) => console.log("Connection problem :", error.message));
