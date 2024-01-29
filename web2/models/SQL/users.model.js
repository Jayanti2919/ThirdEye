const { sqlConnect } = require('../../utils/connection');
const { DataTypes } = require('sequelize');

const connection = sqlConnect();

const Users = connection.define('users', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    channelName: {
        type: DataTypes.STRING,
    },
    channelDesc: {
        type: DataTypes.STRING,
    },
    subscriberCount: {
        type: DataTypes.INTEGER,
    },
    profilePic: {
        type: DataTypes.STRING,
    },
}, {
    tableName: "users",
    timestamps: false,
});

module.exports = Users;