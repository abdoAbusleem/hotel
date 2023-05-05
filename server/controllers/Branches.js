const Branch = require("../models/branches");
const { validateBranch } = require("../helpers/validation");
const Rooms = require("../models/Rooms")


// Add Branch
module.exports.Add_Branch = async (req, res) => {

    //validete Branch
    let error = await validateBranch(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    //check the Branch is created 
    let existBranch = await Branch.findOne({ where: { city: req.body.city } })
    if (existBranch) {
        return res.status(200).send("already created")
    }

    //create Branch 
    let newBranch = await Branch.create(req.body)
    return res.status(200).send(newBranch)

}




// find all Branches
module.exports.all_Branches = async (req, res) => {

    //check data before send if not found
    let allBranches = await Branch.findAll()
    if (allBranches.length == 0) {
        return res.status(400).send("no data found")
    }


    //response
    return res.status(200).send(allBranches)

}




// find one branch by id
module.exports.one_Branch = async (req, res) => {

    //check branch is not found
    let findBranch = await Branch.findOne({ where: { id: req.params.id } })

    if (!findBranch) {
        return res.status(400).send("branch is not found")
    }

    //response
    return res.status(200).send(findBranch)
}



// delete branch
module.exports.delete_Branch = async (req, res) => {

    //check branch is not found
    let checkBranch = await Branch.findOne({ where: { id: req.params.id } })
    if (!checkBranch) {
        return res.status(404).send("Branch is not Found")
    }

    //delete Branch 
    let destroyBranch = await Branch.destroy({ where: { id: req.params.id } })

    //response
    return res.status(200).send("Deleted successfully")
}



// edit branch 
module.exports.update_Branch = async (req, res) => {

    //update branch
    let oldBranch = await Branch.update(req.body, { where: { id: req.params.id } })
    let updateBranch = await Branch.findOne({ where: { id: req.params.id } })

    //check is not found
    if (!updateBranch) {
        return res.status(404).send("Branch is not found")
    }

    //response 
    return res.status(200).send(updateBranch)

}
