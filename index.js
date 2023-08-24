const express = require('express');
const app = express()

app.get('/', (req, res)=>{
    res.send("Hello World");
})

app.get('/bro', (req, res)=>{
    res.send("Hello World");
})

app.get('/found', (req, res)=>{
    res.send("Hello Worlddd");
})

app.get('/final-test', (req, res)=>{
    res.send("Hello final test done");
})


app.listen(4441,()=>{
   console.log('port: 4441');
})

module.exports =  app;
