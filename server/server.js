require('dotenv').config();

const express = require('express');

const notes = require("./routes/api/notes");

const cors = require('cors');

const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json middlewares cada petición pasa por estas lineas
app.use(bodyParser.json());

app.use(cors());

app.use("/api/notes",notes);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
});