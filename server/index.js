const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const sequelize = require("./DBConfing/DBConnection");
const userRoute = require("./routes/users");
const branchRoute = require("./routes/Branches");
const roomRoute = require("./routes/rooms");
const { auth } = require("./middlewares/auth");
const app = express();
require('dotenv').config()

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));


//testing DBConfing

sequelize.authenticate().then(() => {
    console.log("connected!")
}).catch((e) => {
    console.Console("failed!", e.message)
})


// routes

app.use("/api/Users", userRoute);
app.use("/api/Branches", auth, branchRoute);
app.use("/api/Rooms", auth, roomRoute);




//port

const Port = process.env.Port || 4000
app.listen(Port, () => console.log(`server is running on port ${Port}`))
