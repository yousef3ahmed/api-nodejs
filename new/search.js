const express = require( 'express' );
const router = express.Router();
const Experience = require('/experience'); 

router.post("/coaches",async(req,res)=>{
    const data = new Experience({name:req.body.name, by:req.body.by});
    const saveUser = await data.save() ;
    res.send('inserted');
})
router.get("/search/:key",async (req,resp)=>{
    let data = await Experience.find( 
        {
            "$or":[
                {name:{$regex:req.params.key}},
                {by:{$regex:req.params.key}}
            ]
        }
    )
    resp.send(data);
})

module.exports = router ;