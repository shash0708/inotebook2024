// mongodb://localhost:27017/inotebook2024


const mongoose = require('mongoose');

const mongoURI = " mongodb://localhost:27017/inotebook2024";


const connectToMongo = async()=>{
    try{
    await mongoose.connect(mongoURI)
        console.log("Connected to MongoDB");
    }catch(error){
        console.log(`Error connecting to Mongo DB : ${error}`);
    }
    }



module.exports = connectToMongo