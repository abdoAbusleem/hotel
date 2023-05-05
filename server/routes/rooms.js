const router = require("express").Router()
const { Add_Room, All_Rooms, one_Room, rooms_available, rooms_delete, update_room } = require("../controllers/rooms")


//create room
router.post("/add-Room", Add_Room);


//All rooms
router.get("/FindAll", All_Rooms);


//find one room by id
router.get("/find/:id", one_Room);



//find rooms available
router.get("/available", rooms_available)


//delete room
router.delete("/delete/:id", rooms_delete)


//edit room
router.put("/Edit-Room/:id", update_room)



module.exports = router