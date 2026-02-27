const User = require('../models/User');
const crypto = require('crypto');

exports.generateKey = async (req, res) => {
  try {
    // generate a random hex string
    const randomString = crypto.randomBytes(24).toString('hex');
    const newApiKey = `sk_live_${randomString}`;

    // find the user (ID comes from our authMiddleware) and update them
    const user=await User.findById(req.user.id);
    
    if(!user) return res.satus(404).json({msg:"User not found"});

    // save the new key to the database
    user.apiKey=newApiKey;
    await user.save();

    res.json({apiKey: newApiKey, msg:"API Key generated successfully!"});

  }catch(err){
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}; 