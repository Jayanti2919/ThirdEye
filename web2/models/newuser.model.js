const { sqlConnect } = require('../utils/connection');
const { DataTypes } = require('sequelize');
const Users = require("./users.model"); 

const connection = sqlConnect();

const NewUsers = connection.define('newusers', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    videoCount: {
        type: DataTypes.INTEGER,
        defaultValue: 150,
    }
}, {
    tableName: "newusers",
    timestamps: false,
});

NewUsers.belongsTo(Users, { foreignKey: "userId" });

module.exports = NewUsers;
