const router = require( 'express' ).Router() ;
const User = require( '../model/User' ) ;
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


router.post( '/register' 
    ,body('email').isEmail().normalizeEmail()
    ,body('password').isLength({
        min: 6
    })
    ,async ( req , res ) =>{


    // check if the user in the database ;
    const emailExsit = await User.findOne({ email: req.body.email }) ;
    if( emailExsit ){
        return res.status( 400 ).send( 'Email already exists'  ) ;
    }


    // hash password ;
    const salt = await bcrypt.genSalt( 10 ) ;
    const hashPassword = await bcrypt.hash( req.body.password , salt ) ;

    const user = new User({
        name: req.body.name,
        email: req.body.email ,
        password: hashPassword 
    });

    try{
        const saveUser = await user.save() ;
        // res.send( saveUser ) ; 
        res.send({ user: user._id }) ;  
    }catch( err ){
        res.status( 400 ).send( err ) ;
    }
}); 


router.post('/login',async ( req , res )=>{
        
    // check if the user in the database ;
    const user = await User.findOne({ email: req.body.email }) ;
    if( !user ){
        return res.status( 400 ).send( 'Email not exists in BD'  ) ;
    }

    // password is correct 
    const vaildPass  = await bcrypt.compare( req.body.password , user.password ) ;
    if( !vaildPass ) return res.status( 400 ).send( 'invaild password' );


    // create and assgin a token ;
    const token = jwt.sign({_id: user._id} , process.env.TOKEN_SECRET );
    res.header('auth-token' , token ).send( token ) ;
    
}) ;


router.get('/', function( req , res ){
    res.send("Main") ;
    console.log("work");
}) ;



module.exports = router ;