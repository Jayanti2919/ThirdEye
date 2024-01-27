const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

app.get('/', (req, res) => {
  res.send('Listening');
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log('Web2 listening on port ', PORT);
});