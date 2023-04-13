const express = require("express");
const { sequelize } = require("./models");
const { rootRouter } = require("./router/index");
const app = express();
const path = require("path");
app.use(express.json());

// cai static files
const publicPathDirectory = path.join(__dirname, "./public");
app.use(express.static(publicPathDirectory));

//dung router
app.use("/api/v1", rootRouter);

// lang nghe su kien ket noi
app.listen(3000, async () => {
  console.log("App listening on http://localhost:3000");
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
