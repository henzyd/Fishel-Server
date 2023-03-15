const mongoose = require("mongoose");

mongoose
  .connect(process.env.DEV_DB_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to the database...");
  })
  .catch((error) => {
    console.log(error);
  });
