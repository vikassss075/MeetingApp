const {Sequelize} = require('sequelize');

const connection = new Sequelize('appDB', 'root', 'pass', {
    host: 'localhost',
    dialect: 'mysql'
});

(()=>{
    connection.authenticate();
    console.log("connection made to database");
})();

module.exports = connection;