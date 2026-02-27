const express=require('express');
const router=express.Router();
const rateLimiter=require('../middleware/rateLimiter');


//This route require an 'x-api-key' in th header
router.get('/data', rateLimiter, (req, res)=>{
    res.json({msg:"Access granted! Here is your a secret data."});

});

module.exports=router;