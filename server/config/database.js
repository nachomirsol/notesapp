var mysql = require('mysql');

// Set database connection credentials
const config = {
    host     : 'localhost',
    user     : 'test',
    password : 'test',
    database : 'test'
}

// Create a MySQL pool
const pool = mysql.createPool(config);

module.exports = pool;