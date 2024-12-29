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
           postadpage,
           getpostadspage} = require("../controller/userController")
const upload = require("../config/multerConfig")


const Router = express.Router() 

Router.get ("/", homePage)
Router.get("/contact",contactpage)
Router.get("/login", loginPage)
Router.get("/faq", faqPage)
Router.get("/category", categoryPage)
Router.get("/dashboard", dashboardPage)
Router.get("/forgot-password", forgotpasswordPage)
Router.get("/index-2",newindexPage)
Router.get("/index-3", newestindexPage)
Router.get("/blog", blogPage)
Router.get("/payment", paymentpage)
Router.get("/pricing", pricingpage)
Router.get("/privacy-setting", privacysettingpage)
Router.get("/register", registerpage)
Router.get("/services", servicepage)
Router.get("/single-post", singlepostpage)
Router.get("/testimonial", testimonialpage)
Router.get("/adlistinglist",adlistinglistpage )
Router.get("/blog-grid-full-width",bloggridfullwidthpage)
Router.get("/adlistinggrid",adlistinggridpage )
Router.get("/account-myads",accountmyadspage)
Router.get("/account-profile-setting",accountprofilesettingpage )
Router.get("/ads-details",adDetailspage)
Router.get("about",aboutpage )
Router.get("/post-ads", getpostadspage
)
Router.post("/postItem", upload, postadpage)

module.exports= Router;

 

