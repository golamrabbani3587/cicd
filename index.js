const express = require('express');
const app = express()

app.get('/', (req, res)=>{
    res.send("Hello World");
})

app.get('/found', (req, res)=>{
    res.send("Hello Worlddd");
})

app.get('/fin-al', (req, res)=>{
    res.send("Hello final test Success");
})

app.get('/fin-all', (req, res)=>{
    res.send("Hello final test Success");
})


app.listen(2540,()=>{
   console.log('port: 2540');
})
module.exports =  app;
