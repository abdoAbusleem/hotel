const Rooms = require("../models/Rooms")
const { validateRoom } = require("../helpers/validation")

//create rooms
module.exports.Add_Room = async (req, res) => {

    //validate room
    let error = await validateRoom(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    //create room
    let newRoom;
    try {
        newRoom = await Rooms.create(req.body)
    }
    catch (e) {
        return res.status(400).send(`duplicate data for this record branch number ${e.errors[0].value.split("-")[1]} , room no. ${e.errors[0].value.split("-")[0]}`)
    }

    //response
    return res.status(200).send(newRoom)
}



//find all rooms
module.exports.All_Rooms = async (req, res) => {

    //check data before send if not found
    let allRooms = await Rooms.findAll()
    if (allRooms.length == 0) {
        return res.status(400).send("no data found")
    }

    //response
    return res.status(200).send(allRooms)
}


// find one room by id
module.exports.one_Room = async (req, res) => {

    //check is not found
    let findRoom = await Rooms.findOne({ where: { id: req.params.id } })
    if (!findRoom) {
        return res.status(400).send("room not found")
    }

    //response
    return res.status(200).send(findRoom)
}



//find rooms available
module.exports.rooms_available = async (req, res) => {

    // find data 
    let availableRoom = await Rooms.findAll({ where: { states: "available" } })
    if (availableRoom.length == 0) {
        return res.status(400).send("no rooms available")
    }

    // response
    return res.status(200).send(availableRoom)
}



//delete room 
module.exports.rooms_delete = async (req, res) => {

    //check if room not found 
    let checkRoom = await Rooms.findOne({ where: { id: req.params.id } })
    if (!checkRoom) {
        return res.status(400).send("room not found")
    }

    //delete room 
    let destroyRoom = await Rooms.destroy({ where: { id: req.params.id } })

    //response 
    return res.status(200).send("Deleted successfully")

}



//update room 
module.exports.update_room = async (req, res) => {

    //update branch
    let oldRoom = await Rooms.update(req.body, { where: { id: req.params.id } })
    let updateRoom = await Rooms.findOne({ where: { id: req.params.id } })

    //check is not found
    if (!updateRoom) {
        return res.status(404).send("room is not found")
    }

    //response
    return res.status(200).send(updateRoom)
}