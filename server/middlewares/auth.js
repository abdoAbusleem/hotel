module.exports.auth = function(req, res, next){
    //check if login
if (!req.headers["access-token"]) {
     return res.status(401).send("please login before any operation")
 }
 else{
     next()
 }
}