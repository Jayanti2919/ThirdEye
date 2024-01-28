const express = require('express');
const dotenv = require('dotenv');
const {sqlConnect, mongoConnect} = require('./utils/connection');
const Users = require("./models/users.model")
const Videos = require("./models/video.model")

dotenv.config();
const app = express();
const connection = sqlConnect();
mongoConnect();

const syncTables = async() => {
    await Users.sync()
    await Videos.sync()
}

syncTables()

app.get('/', (req, res) => {
  res.send('Listening');
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log('Web2 listening on port', PORT);
});