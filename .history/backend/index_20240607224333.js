const express = require("express");
const mongoose = require("mongoose");
var cors = require('cors')
const dotenv = require('dotenv');

const app = express();
const port = 6000;
mongoose.connect("mongodb+srv://shashankpeddinti07:OFRFfChvWjqZ0bZG@cluster0.foqclvy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("Database Connected");
}).catch((e) => {
    console.log(e);
    console.log("Database Can't Be Connected");
});

app.use(cors(
    {
      origin : "https://inotebookfullstack.vercel.app",
      methods : ["GET","POST","PUT","DELETE"],
      credentials : true
    }
  ));
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
