const express = require('express');
const app = express()

app.get('/', (req, res)=>{
    res.send("Hello World");
})

app.get('/bro', (req, res)=>{
    res.send("Hello World");
})

app.get('/ucu', (req, res)=>{
    res.send("Hello World");
})




app.listen(4441,()=>{
   console.log('port: 4441');
})

module.exports =  app;