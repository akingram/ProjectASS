const auth = require ("../model/authModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const login= (req,res)=>{
    res.render ("login")
}

const signUp =  (req,res)=>{
    res.render("register")
}


const signIn = async(req,res)=>{
    try {
        const { Email, Password}= req.body
        const emptyArr = [];
        const incomingFields = [
          "Email",
          "Password",
        
        ];
        for (const child of incomingFields) {
          if (!req.body[child] || req.body[child] === "") {
            emptyArr.push(child);
          }
        }
        if (emptyArr.length > 0) {
          return res.render("login", {
            error: `This field(s) ${emptyArr.join(",")} cannot be empty`,
          });
        }

        const checkUser = await auth.findOne({ Email:Email})
        if(!checkUser){
            return res.render("login",{error : "Email does not exist"})
        }

      const checkPassword = bcrypt.compareSync(Password, checkUser.password)  
      if(!checkPassword){
        return res.render("login",{error: "wrong credentials"})
      }

      const token = jwt.sign({id: checkUser._id},process.env.JWT_SECRET)
      res.cookie("projectASS", token,{expiresIn:"1hr", httpOnly:true})
      res.redirect("post-ads" )
    
    } catch (error) {
        return res.render("login"),
        console.log(error.message)
        
    }
}


const register = async(req,res) =>{
   try {
    const {Username, Email, Password,retypepassword}= req.body
    const emptyArr = [];
    const incomingFields = [
      "Username",
      "Email",
      "Password",
      "retypepassword",
    ];
    for (const child of incomingFields) {
      if (!req.body[child] || req.body[child] === "") {
        emptyArr.push(child);
      }
    }
    if (emptyArr.length > 0) {
      return res.render("register", {
        error: `This field(s) ${emptyArr.join(",")} cannot be empty`,
      });
    }

    if(Password !== retypepassword){
        return res.render("register", {error: "password does not match"})
    }

    const checkEmail = await auth.findOne({Email:Email})

    if(checkEmail){
        return res.render ("register", {error : "email already exist"})
    }

    const hashpassword = bcrypt.hashSync(Password, 10)

    await auth.create({
        Email : Email,
        Username : Username,
        password :hashpassword,
       
    })

    return res.render ("login", {sucess: "Account created successfully"})

   } catch (error) {

    return res.render("register"),
    console.log(error.message)
   }
}

const logout = async (req,res)=>{
    try {
        if(req.user){
            res.clearCookie("ProjectASS")
            res.redirect("/login")
        }else{
            res.redirect("/login")
        }
        
    } catch (error) {
        console.log(error.message)
        
    }
}
module.exports = {signUp,register,login,signIn,logout}