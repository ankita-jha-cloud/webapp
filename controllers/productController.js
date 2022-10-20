const db = require('../models')

// image Upload
const multer = require('multer')
const path = require('path')
const { uuid } = require('uuidv4');
const bcrypt = require('bcrypt');
const moment= require('moment');

// create main Model
const Product = db.products


// main work

// 1. create product

const addProduct = async (req, res) => {

    const salt=await bcrypt.genSalt()
    const password=  req.body.password;
	const hashPassword = await bcrypt.hash(password, salt)

    let postData = {
        id: uuid(),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: hashPassword,
        createdAt: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')        

    }

    function isEmail(email) {
        var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (email !== '' && email.match(emailFormat)) { return true; }
        return false;
    }

    try{
    if(isEmail(postData.username)){
    const product = await Product.create(postData)
        res.status(200).send({id:postData.id,first_name:postData.first_name, last_name: postData.last_name,username: postData.username, account_created:postData.createdAt , account_updated:postData.updatedAt})
    } 
    }catch(err){
        res.status(400).send("Email already exist")
    }      
}

//get single product

const getOneProduct = async (req, res) => {

    if(!req.headers.authorization){
        res.status(400).send("Enter Auth Value")
    }
    else{
    var encoded = req.headers.authorization.split(' ')[1];
	// decode it using base64
	var decoded = new Buffer(encoded,'base64').toString();
	var name = decoded.split(':')[0];
	var pass = decoded.split(':')[1];

    let id = req.params.id
    let postData = await Product.findOne({ where: { id: id }})


    if(name==postData.username && (await bcrypt.compare(pass,postData.password))){
    res.status(200).send({id:postData.id,first_name:postData.first_name, last_name: postData.last_name,username: postData.username, account_created:postData.createdAt , account_updated:postData.updatedAt})
    }
    else{
        res.status(400).send("No Authorization")  
   }
    }
}

// 4. update Product

const updateacc = async (req, res,next) => {

    //checking basic-auth
    if(!req.headers.authorization || req.body.username){
        res.status(400).send()
        next();
    }
    else{
    var encoded = req.headers.authorization.split(' ')[1];
	// decode it using base64
	var decoded = new Buffer(encoded,'base64').toString();
	var name = decoded.split(':')[0];
	var pass = decoded.split(':')[1];

    const salt=await bcrypt.genSalt()
    const password=  req.body.password;
	const hashPassword = await bcrypt.hash(password, salt)

    let postData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: hashPassword,
        updatedAt: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')  
    }

    let id = req.params.id

    let getdata = await Product.findOne({ where: { id: id }})
    console.log(name,getdata.username)

    if(name==getdata.username && (await bcrypt.compare(pass,get.password))){
    const product = await Product.update( {first_name:postData.first_name, last_name: postData.last_name,password:postData.password,  account_updated:postData.updatedAt} , { where: { id: id }})  
        res.status(200).send("values updated")
    }
    else{
        res.status(400).send("No Authorization")
    }
    }
    
 }




module.exports = {
    addProduct,
    getOneProduct,
    updateacc,
}