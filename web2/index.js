const express = require('express');
const dotenv = require('dotenv');
const {sqlConnect, mongoConnect} = require('./utils/connection');
const Users = require("./models/SQL/users.model");
const Videos = require("./models/SQL/video.model");
const RegistrationOTP = require("./models/SQL/registrationotp.model");
const userRouter = require("./routes/users.route");
const videoRouter = require("./routes/videos.route");
const registrationRouter = require("./routes/registration.route");

dotenv.config();
const app = express();
const connection = sqlConnect();
mongoConnect();

const syncTables = async() => {
    await Users.sync();
    await Videos.sync();
    await RegistrationOTP.sync();
}

syncTables();

app.get('/', (req, res) => {
  res.send('Listening');
});

app.use(express.json());
app.use("/user", userRouter);
app.use("/video", videoRouter);
app.use("/register", registrationRouter);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log('Web2 listening on port', PORT);
});