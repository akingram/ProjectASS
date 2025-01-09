const jwt = require("jsonwebtoken")


const checkUser = (req,res,next)=>{
    const token = req.cookies.projectASS
    const viewUser = jwt.decode(token,process.env.JWT_SECRET)
    req.user= viewUser

    next()
}


module.exports = checkUser