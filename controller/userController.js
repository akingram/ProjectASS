const Ad = require("../model/AdModel")
const cloudinary = require("../config/cloudinaryConfig")

const homePage = (req,res)=>{
    res.render("index")
}
const categoryPage = (req,res)=>{
    res.render("category")
}
const dashboardPage = (req,res)=>{
    res.render("dashboard")
}
const faqPage = (req,res)=>{
    res.render("faq")
}
const forgotpasswordPage = (req,res)=>{
    res.render("forgot-password")
}
const newindexPage = (req,res)=>{
    res.render("index-2")
}
const newestindexPage = (req,res)=>{
    res.render("index-3")
}
const loginPage = (req,res)=>{
    res.render("login")
}
const blogPage = (req,res)=>{
    res.render("blog")
}
const contactpage = (req,res)=>{
    res.render("contact")
}
const offermessagepage = (req,res)=>{
    res.render("offermessages")
}
const paymentpage = (req,res)=>{
    res.render("payment")
}
const postadpage = async (req,res)=>{
    try {
        const{title,category, price,description,name,phone,email } = req.body;
        const images = [];
        const emptyArr =[];
        const incomingFields =[
           "title",
           "category",
           "price",
           "description",
           "name",
           "phone",
           "email",
            
        ];

        for(const child of incomingFields){
            if(!req.body[child] || req.body[child]===""){

            
                emptyArr.push(child)
        }
    }
    if(emptyArr.length > 0){
        return res.render("post-ads",{
            error: `this field(s) ${emptyArr.join(",")} cannot be empty `
        })
    }

    if (req.files && Array.isArray(req.files)){
        const fileArray = req.files.slice(0,5)
        for(const file of fileArray){
            const uploadedImage = await cloudinary.uploader.upload(file.path)
             images.push(uploadedImage.secure_url)
        }
    }
      
   const mayo = await Ad.create({
        title:title,
        category:category,
        price:price,
        description:description,
        name:name,
        phone:phone,
        email:email,
        images:images

        

    })

    console.log(mayo)
    res.render ("post-ads",{success:"post sucessful"})
    } catch (error) {
        console.log(error.message)
        res.render("post-ads",{error})
    }
    
};
const getpostadspage = (req,res)=>{
    res.render("post-ads")
}
const privacysettingpage = (req,res)=>{
    res.render("privacy-setting")
}
const registerpage = (req,res)=>{
    res.render("register")
}

const servicepage = (req,res)=>{
    res.render("service")
}

const singlepostpage = (req,res)=>{
    res.render("single-post")
}

const testimonialpage = (req,res)=>{
    res.render("testimonial")
}
const pricingpage = (req,res)=>{
    res.render("pricing")
}
const aboutpage = (req,res)=>{
    res.render("about")
}

const adlistinggridpage = (req,res)=>{
    res.render("adlistinggrid")
}

const adlistinglistpage = (req,res)=>{
    res.render("adlistinglist")
}
const bloggridfullwidthpage = (req,res)=>{
    res.render("blog-grid-full-width")
}

const blogleftsidebarpage = (req,res)=>{
    res.render("blog-left-sidebar")
}
const accountprofilesettingpage = (req,res)=>{
    res.render("account-profile-setting")
}
const accountmyadspage = (req,res)=>{
    res.render("account-myads")
}
const accountfavouriteadspage = (req,res)=>{
    res.render("account-favourite-ads")
}
const adDetailspage = (req,res)=>{
    res.render("ads-details")
}

module.exports ={
    
    adDetailspage,
    adlistinglistpage ,
    bloggridfullwidthpage,
    adlistinggridpage,
    accountfavouriteadspage,
    accountmyadspage,
    accountprofilesettingpage,
    blogleftsidebarpage,
    homePage,
    contactpage,
    blogPage,
    newestindexPage,
    newindexPage,
    loginPage,
    forgotpasswordPage,
    faqPage,
    dashboardPage,
    categoryPage,
    offermessagepage,
    getpostadspage,
    pricingpage,
    paymentpage,
    privacysettingpage,
    registerpage,
    servicepage,
    singlepostpage,
    testimonialpage,
    aboutpage,
   postadpage

};