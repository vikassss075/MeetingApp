const sequelize = require('../utils/db-connection');
const {DataTypes} = require('sequelize');

const Meeting = sequelize.define('Meeting', {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Meeting;