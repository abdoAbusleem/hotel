const router = require("express").Router();
const { Add_Branch, all_Branches, one_Branch, delete_Branch, update_Branch } = require("../controllers/Branches")


// Add Branch
router.post("/Add-Branch", Add_Branch)


// find all Branches
router.get("/FindAll", all_Branches)


// find one branch by id
router.get("/find/:id", one_Branch)


// delete branch
router.delete("/Delete/:id", delete_Branch)



// edit branch 
router.put("/Edit-Branch/:id", update_Branch)



module.exports = router