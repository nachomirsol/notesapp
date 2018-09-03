var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'test',
    password : 'test',
    database : 'test'
});

connection.connect((err) => {
    if(err){
        console.log('Error en la conexión');
        return
    }
    console.log('Conexión establecida');
})

module.exports = connection;