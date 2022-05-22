const express = require('express') ;
const app = express() ;
const mongoose = require('mongoose') ;
const dotenv = require( 'dotenv' ) ;
const port = process.env.port || 3300; 

 // import router ;
 var authRoute = require("./routes/auth.js");

 // import posts ;
 var postRoute = require( './routes/posts' );

 // import Coach
 var authCoach = require("./routes/authCoach.js") ;

dotenv.config();

// connect to DB 
mongoose.connect( process.env.DB_CONNECT ,
 ( ) => {
    console.log( 'Connect to DB' ) ;
});

app.use( express.json() ) ;


 //Route middlewares ;
app.use("/api/Learner" , authRoute) ;

app.use("/api/Coach" , authCoach) ;

app.use( "/api/posts" , postRoute );

// app.get('/' , ( req , res )=>{
//     res.send( "i am here" );
// });

app.listen( port ,  ()=>{ 
    console.log("Server Up and Running on port " + port); 
});






