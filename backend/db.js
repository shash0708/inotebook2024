// mongodb://localhost:27017/inotebook2024


const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://shashankpeddinti07:UrE22NhfARxDtg5N@clusterinotebook.ddhcthl.mongodb.net/inotebook";


const connectToMongo = async()=>{
    try{
    await mongoose.connect(mongoURI)
        console.log("Connected to MongoDB");
    }catch(error){
        console.log(`Error connecting to Mongo DB : ${error}`);
    }
    }



module.exports = connectToMongo