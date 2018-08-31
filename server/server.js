require('dotenv').config();

const express = require('express');

const mysql = require('mysql');

const app = express();

const bodyParser = require('body-parser');

app.get('/test', (req,res) => {
    res.send('it works');
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
});