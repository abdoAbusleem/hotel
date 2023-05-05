const Sequelize = require("sequelize");
require('dotenv').config()
console.log(process.env.password)



//connection
const sequelize = new Sequelize(process.env.database, process.env.user, process.env.password, {
  host: process.env.host,
  dialect: "mysql"
})



//sync all models
sequelize.sync()



module.exports = sequelize


