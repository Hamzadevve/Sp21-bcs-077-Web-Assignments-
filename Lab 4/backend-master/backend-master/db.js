const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/iNotebook";

const connectToMongo = ()=>{
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI , ()=>{
        console.log("Connected to mongoose Successfully");
    });
}

module.exports = connectToMongo;