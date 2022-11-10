const db = require('../models')
const User = db.users;
// image Upload
const multer = require('multer')
const path = require('path')
const { uuid } = require('uuidv4');
const bcrypt = require('bcrypt');
const moment= require('moment');
const emailValidator = require("email-validator");

// create main Model
const Product = db.products


// main work

// 1. create product

const addProduct = async (req, res) => {
    if (
      !req.body.username ||
      !req.body.first_name ||
      !req.body.last_name ||
      !req.body.password
    ) {
      res.status(400).send();
    } else {
      // generate salt to hash password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
  
      let info = {
        id:uuid(),
        username: req.body.username,
        last_name: req.body.last_name,
        first_name: req.body.first_name,
        password: hashPassword,
      };
  
      if (
        !emailValidator.validate(`${req.body.username}`) ||
        !req.body.first_name ||
        !req.body.last_name
      ) {
        res.status(400).send();
      } else {
        const findUser = await User.findOne({
          where: { username: `${req.body.username}` },
        });
        if (findUser === null) {
          const user = await User.create(info).then((data) => {
            let plainUser = {
              id: data.id,
              username: data.username,
              first_name: data.first_name,
              last_name: data.last_name,
              account_created: data.createdAt,
              account_updated: data.updatedAt,
            };
  
            res.status(201).json(plainUser);
          });
  
          res.status(201).send();
        } else {
          res.status(400).send();
        }
      }
    }
  };

//get single product

const getOneProduct = async (req, res) => {
    console.log(db);
    if (req.headers.authorization === undefined) {
      res.status(403).send();
    } else {
      //grab the encoded value, format: bearer <Token>, need to extract only <token>
      var encoded = req.headers.authorization.split(" ")[1];
      // decode it using base64
      var decoded = new Buffer(encoded, "base64").toString();
      var username = decoded.split(":")[0];
      var password = decoded.split(":")[1];
  
      // check if the passed username and password match with the values in our database.\
  
      const findUser = await User.findOne({
        where: { username: username },
      });
      if (findUser !== null) {
        if (await bcrypt.compare(password, findUser.password)) {
          let plainUser = {
            id: findUser.id,
            username: findUser.username,
            first_name: findUser.first_name,
            last_name: findUser.last_name,
            account_created: findUser.createdAt,
            account_updated: findUser.updatedAt,
          };
  
          //res.status(200).send(JSON.stringify(plainUser));
          res.status(200).json(plainUser);
        } else {
          res.status(401).send();
        }
      } else {
        res.status(400).send();
      }
    }
  };

// 4. update Product

const updateacc = async (req, res) => {
    if (req.body.id || req.body.account_created || req.body.account_updated) {
      res.status(400).send();
    } else {
      if (
        !req.body.username ||
        !req.body.first_name ||
        !req.body.last_name ||
        !req.body.password
      ) {
        res.status(400).send();
      } else {
        if (req.headers.authorization === undefined) {
          res.status(403).send();
        } else {
          //grab the encoded value, format: bearer <Token>, need to extract only <token>
          var encoded = req.headers.authorization.split(" ")[1];
          // decode it using base64
          var decoded = new Buffer(encoded, "base64").toString();
          var username = decoded.split(":")[0];
          var password = decoded.split(":")[1];
  
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(req.body.password, salt);
          // check if the passed username and password match with the values in our database.\
  
          const findUser = await User.findOne({
            where: { username: username },
          });
          if (findUser !== null) {
            if (!req.body.first_name || !req.body.last_name || !req.body.password) {
              res.status(400).send();
            } else {
              if (await bcrypt.compare(password, findUser.password)) {
                if (passValidator.validate(`${req.body.password}`)) {
                  findUser.update({
                    first_name: `${req.body.first_name}`,
                    last_name: `${req.body.last_name}`,
                    password: hashPassword,
                  });
                  res.status(204).send();
                } else {
                  res.status(400).send();
                }
              }
              res.status(401).send();
            }
          } else {
            res.status(400).send();
          }
        }
      }
    }
  };




module.exports = {
    addProduct,
    getOneProduct,
    updateacc
}