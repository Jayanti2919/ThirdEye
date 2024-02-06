const crypto = require('crypto');
const nodemailer = require('nodemailer');

const generateOTP = () => {
    const otp = Math.floor(100000 + crypto.randomInt(999999));
    return otp.toString();
}

const sendEmail = async(email, otp) => {
    console.log("Sending email");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS | "",
      to: email,
      subject: "ThirdEye OTP!",
      text: `Your OTP is ${otp}.`,
    };
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error("Error sending email", err);
          reject("Internal server error");
        } else {
          console.log("Email sent:", info.response);
          resolve("OTP sent successfully");
        }
      });
    });
  }

module.exports = {generateOTP, sendEmail}; 