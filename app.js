var express = require('express')
var app= express()

app.get('/healthz', function(req,res){

    res.status(200).send()
})


var server= app.listen(8000,function(){
    console.log("server is listening at port 8000")
})