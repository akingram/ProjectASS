const express = require("express")
const { homePage, contactpage, 
  loginPage, 
  faqPage, categoryPage,
   dashboardPage,
    forgotpasswordPage, 
    newindexPage, 
    newestindexPage,
     blogPage,
      paymentpage, 
      pricingpage,
       privacysettingpage,
        registerpage,
         servicepage, 
         singlepostpage, 
         testimonialpage, 
         aboutpage, 
         adlistinglistpage,
          bloggridfullwidthpage, 
          adlistinggridpage, 
          accountfavouriteadspage,
           accountmyadspage, 
           accountprofilesettingpage, 
           adDetailspage, 
           postAds,
           getpostadspage} = require("../controller/userController")
const upload = require("../config/multerConfig")
const { signUp, register, login, signIn, logout } = require("../controller/AuthController")
const checkUser = require("../middleware/userToken")


const Router = express.Router() 

Router.get ("/",checkUser, homePage)
Router.get("/contact",checkUser,contactpage)
Router.get("/login", loginPage)
Router.get("/faq", faqPage)
Router.get("/category",checkUser, categoryPage)
Router.get("/dashboard",checkUser, dashboardPage)
Router.get("/forgot-password", forgotpasswordPage)
Router.get("/index-2",checkUser,newindexPage)
Router.get("/index-3", checkUser,newestindexPage)
Router.get("/blog",checkUser, blogPage)
Router.get("/payment",checkUser, paymentpage)
Router.get("/pricing",checkUser, pricingpage)
Router.get("/privacy-setting", privacysettingpage)
Router.get("/register", registerpage)
Router.get("/services", checkUser,servicepage)
Router.get("/single-post", checkUser,singlepostpage)
Router.get("/testimonial", testimonialpage)
Router.get("/adlistinglist",checkUser,adlistinglistpage )
Router.get("/blog-grid-full-width",checkUser,bloggridfullwidthpage)
Router.get("/adlistinggrid",checkUser,adlistinggridpage )
Router.get("/account-myads",checkUser,accountmyadspage)
Router.get("/account-profile-setting",checkUser,accountprofilesettingpage )
Router.get("/ads-details/:id",checkUser,adDetailspage)
Router.get("about",aboutpage )
Router.get("/post-ads",checkUser, getpostadspage)
Router.get("/register", signUp)
Router.get("/login", login)
Router.get("/logout", logout)
Router.post("/createuser", register)
Router.post("/signin", signIn)

Router.post("/post-ads",checkUser, upload, postAds)

module.exports= Router;

 

