// craete mysql configuration

const mysql = require("mysql")

//import database config file from config/db.config.js for credential

const  dbConfig = require("../config/db.config.js")

//create connection with database
const connection = mysql.createConnection({
    host:dbConfig.HOST,
    user:dbConfig.USER,
    password:dbConfig.PASSWORD,
    database: dbConfig.DB,
    port:dbConfig.PORT
}); 

module.exports = connection;