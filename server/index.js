require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');

const app = express();
const PORT = process.env.PORT || 5000;
const URI = process.env.URI;


app.use(express.json());    
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin: process.env.CLIENT_URL
}));    
app.use('/api', router); 
app.use(errorMiddleware);

const start = async () =>{
    try{
        mongoose.connect(URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        app.listen(PORT, () => console.log('server has been started on port ' + PORT));
    }catch(e){
        console.log(e);
    }}

start()