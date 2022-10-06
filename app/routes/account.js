const con = require('../database/database');
const { uuid } = require('uuidv4');
var express = require('express');
const parse = require('body-parser')
const emailvalidator = require("email-validator");


var router = express.Router();
const bcrypt = require('bcrypt');
const { NULL } = require('mysql/lib/protocol/constants/types');
const saltRounds = 5;



//rest api to get a single account data
router.get('/v1/account/:id', function (req, res) {
	var encoded = req.headers.authorization.split(' ')[1];
	// decode it using base64
	var decoded = new Buffer(encoded,'base64').toString();
	var name = decoded.split(':')[0];
	var pass = decoded.split(':')[1];


	con.query(`select * from account where id ='${req.params.id}'`,async(err,row)=>{
		
		if(name==row[0].username && await ((bcrypt.compare(pass,row[0].password)))){
			con.query(`select id,first_name,last_name,username,account_created,account_updated from account where id='${req.params.id}'`, function (error, results, fields) {
	   if (error) throw error;
	   res.end(JSON.stringify(results));
	 });
	}
})
});


//rest api to create a new record into mysql database
router.post('/v1/account', async function (req, res) {
	if (!req.body.first_name || !req.body.password || !req.body.last_name || !req.body.username) {
		console.log("hi!!!hgsdshdgsgd")
		res.status(400).send({
		  message: "Content can not be empty!"
		});
	  }
else{
	console.log("hi!!!hgsdshdgsgd")
	const datetime = new Date();
	router.use(parse.json());

	// check if nothing is empty

	// if(password!=null && req.body.first_name!=null && req.body.last_name!=null && req.body.username!=null){
		const password=  req.body.password;
		const encryptedPassword = await bcrypt.hash(password, saltRounds)
		
		
		
		const postData = {
			id: uuid(),
			first_name: req.body.first_name,
			last_name: req.body.first_name,
			password: encryptedPassword,
			username: req.body.username,
			account_created:datetime,
			account_updated:datetime
		};
		
		
		con.query('INSERT INTO account SET ?', postData, function (error, results, fields) {
		if (error){
			res.status(500).send({
				message:
				  error.message || "Some error occurred while creating the Account."
		});
	}
		else res.send({id:postData.id,first_name:postData.first_name,
			last_name: postData.last_name,account_created : postData.account_created,account_updated: postData.account_updated})
		});
	
	// }
	}
	 
 });

 router.put('/v1/account/:id',async function(req,res){
	if (!req.body.first_name || !req.body.password || !req.body.last_name) {
		console.log("hi!!!hgsdshdgsgd")
		res.status(400).send({
		  message: "Content can not be empty!"
		});
	  }
	  else{

	  
	var encoded = req.headers.authorization.split(' ')[1];
	// decode it using base64
	var decoded = new Buffer(encoded,'base64').toString();
	var name = decoded.split(':')[0];
	var pass = decoded.split(':')[1];

	const bcrypt = require('bcrypt');
	router.use(parse.json());
	const datetime = new Date();
	const password=  req.body.password;
	const encryptedPassword = await bcrypt.hash(password, saltRounds)

	const id = req.params.id;
	const first_name = req.body.first_name;
	const last_name= req.body.first_name;
	
	
	const username= req.body.username;
	const account_created=datetime;
	const account_updated=datetime;



	con.query(`select * from account where id ='${id}'`,async(err,row)=>{
		
		if(name==row[0].username && await ((bcrypt.compare(pass,row[0].password)) && !req.body['username'])){
			
			con.query(`UPDATE account SET first_name = ?,last_name =?,password=?,account_updated=? WHERE id = ?`,[
				req.body.first_name,req.body.last_name,req.body.password,req.body.account_updated,req.params.id],function (error, results, fields){
					if (error) {
						res.status(400).send()
					};
					console.log(results)
					res.send({id,first_name,last_name,account_updated,username})

				  });
				}
	else{
		res.send("Can't update username, try without username!");


	}
	
 }) }
 });



module.exports = router;
