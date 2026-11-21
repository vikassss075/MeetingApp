const sequelize = require('../utils/db-connection');
const {DataTypes} = require('sequelize');

const Slot = sequelize.define('Slot', {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false
    },
    availableSlots: {
        type: DataTypes.INTEGER,
        defaultValue: 4,
        allowNull: false
    },
    meetingLink:{
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Slot;