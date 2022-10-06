var express = require('express')
const routes = require('./app/routes/account'); // import the routes
var accountdataRouter = require('./app/routes/account');
flash = require('express-flash')

var app= express()

app.use(express.json());
 app.get('/healthz', function(req,res){

    res.status(200).send()
})


app.use(flash());

app.use('/', accountdataRouter);


 var server= app.listen(8000,function(){
    console.log("server is listening at port 8000")
})



