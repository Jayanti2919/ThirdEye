const Sequelize = require("sequelize");
const mongoose = require("mongoose");

const mongoConnect = () => {
  mongoose
    .connect("mongodb://localhost:27017")
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((e) => {
      console.log(e);
    });
};

const sqlConnect = () => {
  const connection = new Sequelize("thirdeye", "root", "", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  });
  connection
    .authenticate()
    .then(() => {
      console.log("Connected to thirdeye db");
    })
    .catch((error) => {
      console.log(error);
    });
  return connection;
};

module.exports = {
  mongoConnect,
  sqlConnect,
};
