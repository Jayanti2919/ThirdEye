const { sqlConnect } = require('../../utils/connection');
const { DataTypes } = require('sequelize');

const connection = sqlConnect();

const RegistrationOTP = connection.define('registrationOTPs', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    otp: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "registrationOTPs",
    timestamps: false,
});

module.exports = RegistrationOTP;