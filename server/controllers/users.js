const User = require("../models/users")
const _ = require("lodash");
const bcrypt = require("bcrypt")
const { validation, validatelogin } = require("../helpers/validation")


module.exports.register = async (req, res) => {

  //validate request 
  let error = await validation(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  // checl if user registerd 
  let existUser = await User.findOne({ where: { email: req.body.email } })

  if (existUser) {
    return res.send({ msg: "already regeisterd" })
  }

  // create user 
  let newUser = User.build(req.body)

  //hash password
  let saltRound = 10;
  let salt = await bcrypt.genSalt(saltRound)
  newUser.password = await bcrypt.hash(newUser.password, salt)

  //save user 
  await newUser.save()

  //token 
  newUser.generateToken()

  //response
  let data = _.pick(newUser, ["id", "name", "email"])
  return res.status(200).header('access-token', newUser.token).send({ user: data, message: "thanks for register" })

}



module.exports.login = async (req, res) => {

  //validate login
  let error = await validatelogin(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  //check acc if notfound
  let loginUser = await User.findOne({ where: { email: req.body.email } })
  if (!loginUser) {
    return res.status(400).send("email or password is wrong")
  }

  //compare password
  let match = await bcrypt.compare(req.body.password, loginUser.password)

  if (!match) {
    return res.status(400).send("email or password is wrong")
  }

  //generate token 
  loginUser.generateToken()


  //send response
  let data = _.pick(loginUser, ["id", "name", "email"])
  return res.status(200).header("access-token", loginUser.token).send(data)

}

