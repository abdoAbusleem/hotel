const sequelize = require("../DBConfing/DBConnection");
const { DataTypes, Model } = require("sequelize");
const Branch = require('./branches');

class Room extends Model { };

Room.init({

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },

    branch_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Branch,
            key: 'id'
        }
    },
    room_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    room_Type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    states: {
        type: DataTypes.ENUM,
        values: ['available', 'Booked up']
    }
}, {
    sequelize,
    modelName: "Room",
    indexes: [{ unique: true, fields: ["room_number", "branch_id"] }]
})

Branch.hasMany(Room, { onDelete: 'cascade', hooks: true });
Room.belongsTo(Branch)


module.exports = Room