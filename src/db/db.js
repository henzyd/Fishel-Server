const mongoose = require("mongoose");

if (process.env.NODE_ENV === "development") {
  console.log("in development mode");
  mongoose
    .connect(process.env.DEV_DB_CONNECTION_STRING)
    .then(() => {
      console.log("Connected to the database...");
    })
    .catch((error) => {
      console.log(error);
    });
} else {
  console.log("in production mode");
  mongoose
    .connect(
      process.env.PROD_DB_CONNECTION_STRING.replace(
        "<password>",
        process.env.DB_PASSWORD
      )
    )
    .then(() => {
      console.log("Connected to the database...");
    })
    .catch((error) => {
      console.log(error);
    });
}
