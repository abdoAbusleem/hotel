const sequelize = require("../DBConfing/DBConnection");
const { DataTypes, Model } = require("sequelize");
const jwt = require("jsonwebtoken");


class User extends Model {
    generateToken(){
        this.token = jwt.sign({ id: this.id }, 'secret');
    }
}

User.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:false,
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull : false
    }
},{
    sequelize,
    modelName: 'User'
})


module.exports = User