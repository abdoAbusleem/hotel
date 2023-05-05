const sequelize = require("../DBConfing/DBConnection")
const { DataTypes, Model } = require("sequelize")




class Branch extends Model { }

Branch.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        noUpdate: {
            readOnly: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },

}, {
    sequelize,
    modelName: 'Branch'
})


module.exports = Branch