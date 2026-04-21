const express =require('express');
const notFound = require('./src/middleware/notFound');
const errorHandler = require('./src/middleware/errorHandler');

const app=express();

app.use(express.json());
app.use(notFound);
app.use(errorHandler);

app.get('/',(req,res)=>{
    res.send("App is running");
});

app.get('/api/health',(req,res)=>{
    res.json({success:true,message:"API is healthy"});
})


module.exports=app;