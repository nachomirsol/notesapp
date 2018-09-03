require('dotenv').config();
const express = require('express');

var conn = require('./models/connection');

const app = express();

conn.connect();

if(conn){
    console.log('Has conectado')
}

app.get('/test', (req,res) => {
    res.send('it works');
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
});