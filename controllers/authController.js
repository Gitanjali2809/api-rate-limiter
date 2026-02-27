const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

exports.register=async (req, res)=> {
    try {
        const{email,password}=req.body;

        // Check if user already exists
        let user=await User.findOne({email});
        if(user) return res.status(400).json({msg:"User already exists"});
       //  Hash the password (Don't save plain text!)
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password, salt);
        // create and save user
        user=new User({
            email,
            password:hashedPassword,
        });

        await user.save();

        //create JWT Token
        const token=jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"1h"});
        res.status(201).json({token, msg:"User registered successfully"});
    } catch(err) {
        res.status(500).send("Server Error");
    }
};

//Login 
 exports.login=async (req, res)=> {
        try{
            const{email, password}=req.body;

            //find user
            const user=await User.findOne({email});
            if(!user) return res.status(400).json({msg:"Invalid credentials"});

            //compare password
            const isMatch=await bcrypt.compare(password, user.password);
            if(!isMatch) return res.status(400).json({msg:"Invalid credentials"});

            //create and return JWT Token
            const token=jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"1h"});
            res.json({token, msg:"Login successful"});
        } catch(err) {
            res.status(500).send("Server Error");
        }

    };