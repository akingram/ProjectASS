const express = require ("express");
const app = express()
const expresshbs = require("express-handlebars")
require("dotenv").config()
const mongoose = require("mongoose")
const cookieparser = require("cookie-parser")
const MONGODB = process.env.MONGO_URL
const allRouters = require("./router/userRoute")

mongoose.connect(MONGODB)
.then(()=>{
    console.log("data base is connected")
})
.catch ((err)=>{
    console.log(err.message)
})

app.engine("hbs", expresshbs.engine({
    extname: "hbs",
    defaultLayout : "main",
    runtimeOptions : {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodByDefault : true,
    }

}))

app.set("view engine", "hbs")
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieparser())

app.use("/", allRouters)

app.get("*", (req,res)=>{
    res.send("<h1> page not found</h1>")
})

const port = process.env.PORT
app.listen (port,()=>{
    console.log(`server is running on port ${port}`)
})