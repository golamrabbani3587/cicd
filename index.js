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


app.listen(5549,()=>{
   console.log('port: 5549');
})

module.exports =  app;
