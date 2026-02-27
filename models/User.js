const mongoose=require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        uniquie:true,
    },
    password:{
        type:String,
        reuired:true,
    },apiKey:{   
        type:String,
        default:null,
        unique:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
});

module.exports=mongoose.model('User', UserSchema);