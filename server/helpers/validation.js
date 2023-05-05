const { request } = require("express")
const joi = require("joi")
const { values } = require("lodash")

//register
module.exports.validation = async (request) => {
    let schema = joi.object({
        name: joi.string().min(8).max(20).required(),
        email: joi.string().email({ maxDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
        password: joi.string().required()
    })
    let { error } = await schema.validate(request)
    return error
}

//login
module.exports.validatelogin = async (Request) => {
    let schema = joi.object({
        email: joi.string().email({ maxDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
        password: joi.string().min(6).required()
    })
    let { error } = await schema.validate(Request)
    return error
}


//branches
module.exports.validateBranch = async (Request) => {
    let schema = joi.object({
        name: joi.string().required(),
        city: joi.string().required()
    })
    let { error } = await schema.validate(Request)
    return error
}




//Rooms
module.exports.validateRoom = async (Request) => {
    let schema = joi.object({
        branch_id: joi.number().required(),
        room_number: joi.number().required(),
        room_Type: joi.string().required().only().allow("Single", "Double", "Triple"),
        states: joi.string().valid("available", "Booked up").required()
    })
    let { error } = await schema.validate(Request)
    return error
}





