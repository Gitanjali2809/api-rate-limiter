const express=require('express');
const router=express.Router();
const auth=require('../middleware/authMiddleware');// protection layer
const { generateKey} =require('../controllers/keyController');

// POST  /api/keys/generate
//the 'auth' middleware suns first to check the JWT
router.post('/generate', auth, generateKey);

module.exports=router;