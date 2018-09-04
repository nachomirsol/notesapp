var mysql = require('mysql');
const data = require('../config/config');

var connection = mysql.createConnection({
    host     : data.database.host,
    user     : data.database.user,
    password : data.database.password,
    database : data.database.database
});

connection.connect((err) => {
    if(err){
        console.log('Error en la conexión');
        return
    }
    console.log('Conexión establecida');
})

module.exports = connection;