const { sqlConnect } = require('../../utils/connection');
const { DataTypes } = require('sequelize');
const Users = require("./users.model");

const connection = sqlConnect();

const Videos = connection.define('videos', {
    videoId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    videoHash: {
        type: DataTypes.STRING,
        unique: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    thumbnailHash: {
        type: DataTypes.STRING,
    },
    uploadDate: {
        type: DataTypes.DATE,
    },
    genre: {
        type: DataTypes.STRING,
    },
    tags: {
        type: DataTypes.STRING,
        get(){
            const stringValue=this.getDataValue('tags');
            return stringValue?stringValue.split(','):null;
        },
        set(value){
            const arrayValue=value?value.join(','):'';
            this.setDataValue('tags',arrayValue);
        },
    },
    description: {
        type: DataTypes.STRING,
    },
    likeCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    viewCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    commentCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    channelName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "videos",
    timestamps: false,
});

Videos.belongsTo(Users, { foreignKey: "channelName", targetKey: "channelName" });


module.exports = Videos;
