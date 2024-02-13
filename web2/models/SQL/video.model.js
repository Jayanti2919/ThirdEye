const { sqlConnect } = require('../../utils/connection');
const { DataTypes } = require('sequelize');
const Users = require("./users.model");

const connection = sqlConnect();

const Videos = connection.define('videos', {
    videoHash: {
        type: DataTypes.STRING,
        primaryKey: true,
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
            return stringValue?rawValue.split(','):null;
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
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: "videos",
    timestamps: false,
});

Videos.belongsTo(Users, { foreignKey: "userId" });

module.exports = Videos;
