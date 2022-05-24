const express = require('express');
require("./config");   //database connection 
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/project", ()=> {console.log("hello")});
const Experience = require('./experience');  //model(schema)
const app = express();




app.use(express.json());

app.get("/search/:key",async (req,resp)=>{
    const data = new Experience({name:"swim", by:"coach"});
    const saveUser = await data.save() ;

    let output = await Experience.find(             
                {name:req.params.key}         
    )

    //resp.send("Hello!"); 
    resp.send({saveUser});
    
})



app.listen(5000)

/*let data = await Experience.find( 
        {
            "$or":[
                {name:{$regex:req.params.key}},
                {by:{$regex:req.params.key}}
            ]
        }
    )*/