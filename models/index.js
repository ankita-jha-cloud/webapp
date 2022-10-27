const dbConfig = require('../config/dbConfig.js');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.picture = require("./picture.model.js")(sequelize, Sequelize);
db.users = require("./productModel.js")(sequelize, Sequelize);


module.exports = db;