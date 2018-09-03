const connection = require('./connection');

const Notes = {
    getAllNotes:function(callback){
        return connection.query("SELECT * FROM notas")
    }
}

module.exports = Notes