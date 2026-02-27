const express=require('express');
const dotenv=require('dotenv');


dotenv.config();
const connectDB = require('./config/db'); 
connectDB();

const app=express();
app.use(express.json()); 

//Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/keys', require('./routes/keyRoutes'));
app.use('/api', require('./routes/apiRoutes'));




app.get('/', (req,res)=>{
    res.send("API Rate Limiter System is running!");
});

const PORT=process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));