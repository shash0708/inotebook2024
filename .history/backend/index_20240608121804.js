const express = require("express");
const mongoose = require("mongoose");
var cors = require('cors')
const dotenv = require('dotenv');
const bodyParser = require('body-parser')

const app = express();
const port = 5000;
dotenv.config();
const uri =  "mongodb+srv://shashankpeddinti07:OFRFfChvWjqZ0bZG@cluster0.foqclvy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


app.use(cors(
    {
      origin : "https://inotebook2024.vercel.app",
      methods : ["GET","POST","PUT","DELETE"],
      credentials : true
    }
  ));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//availble routes
app.get('/',(req,res)=>{
    res.send("Home route")
})
app.use('/api/notes', require('./routes/notes.js'));
app.use('/api/auth', require('./routes/auth.js'));


app.get('*', (req, res) => {
    res.status(404).send('Not Found');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
