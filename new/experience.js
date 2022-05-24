//defining schema


const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/project");
const ExperienceSchema=  mongoose.Schema({
    
    name: String,
    by: String
   });

module.exports= mongoose.model("experience",ExperienceSchema);