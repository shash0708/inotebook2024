const express = require("express");
const mongoose = require("mongoose");
var cors = require('cors')

const app = express();
const port = 5000;
mongoose.connect("mongodb+srv://shashankpeddinti07:eOOcBP8eiHXLUBrI@clusternew.d3dud4l.mongodb.net/inotebookdb").then(() => {
    console.log("Database Connected");
}).catch((e) => {
    console.log(e);
    console.log("Database Can't Be Connected");
});

app.use(cors(
    {
        origin : "https://inotebookfullstack.vercel.app",
        methods : ["POST","GET","PUT","DELETE"],
        credentials : true
    }
))

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
