const express = require('express');
const { info } = require('winston');
const logger = require('./logger');
const app = express();
const db = require("./models");
const router = require('./routes/productRouter.js');
require('dotenv').config();


// statsd

const SDC = require("statsd-client");

const sdc = new SDC({ host: "localhost", port: 8125 });

var start = new Date();


// Syncing the DB using Sequelize
db.sequelize.sync()
.then((
    console.log("DB sync done!")
));

// Health Check endpoint - returns 200 HTTP status code
app.get('/healthz', (req,res) => {
    sdc.timing("health.timeout", start);

    logger.info("/health running fine");
  
  sdc.increment("endpoint.health");
  
    res.status(200).send();
})

//Middlewear
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Router
app.use('/v1', router);

const PORT = 3000;
app.listen(PORT, () => logger.log('info',`Server listening on ${PORT}`))

module.exports = app;