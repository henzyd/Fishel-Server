require("dotenv").config();
require("./db/db");
const app = require("./app");

app.listen(process.env.PORT, () => {
  console.log(
    "Server listening on port > " +
      process.env.PORT +
      "\n local server => " +
      `http://localhost:${process.env.PORT}/api`
  );
});
