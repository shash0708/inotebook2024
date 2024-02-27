const express = require("express");
const mongoose = require("mongoose");
var cors = require('cors')

const app = express();
const port = 5000;
mongoose.connect("mongodb://127.0.0.1:27017/inotebook2024").then(() => {
    console.log("Database Connected");
}).catch((e) => {
    console.log(e);
    console.log("Database Can't Be Connected");
});

app.use(cors())
app.use(express.json());

//availble routes
app.use('/api/notes', require('./routes/notes.js'));
app.use('/api/auth', require('./routes/auth.js'));


app.get('*', (req, res) => {
    res.status(404).send('Not Found');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
