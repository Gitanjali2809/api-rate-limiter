const jwt=require('jsonwebtoken');

module.exports=function(req, res, next){
    //get token from header
    const token=req.header('Authorization')?.split(' ')[1];

    // check if no token
    if(!token) return res.status(401).json({msg:"No token, authorization denied"});
    
    //verify token
    try{
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        req.user=decoded; //this adds the user ID  to the request object
        next();  //move to the next function
    } catch(err) {
        res.status(401).json({msg:"Token is not valid"});
    }
};