const adsModel = require("../model/AdModel")

const cloudinary = require("../config/cloudinaryConfig");
const AdModel = require("../model/AdModel");
const auth = require("../model/authModel")

const homePage =async(req, res) => {
try {
  if(req.user){
    const userid = req.user.id
    const currentuser= await auth.findOne({_id:userid})  
  res.render("index", {currentuser})
  }
  else{
    res.render("index");
  }
  
} catch (error) {
  res.render("index");
  console.log(error.message)
}

  res.render("index");
};
const categoryPage = async(req, res) => {
  try {
    if(req.user){
      const userid = req.user.id
      const currentuser= await auth.findOne({_id:userid})  
    res.render("category", {currentuser})
    }
    else{
      res.render("category");
    }
    
  } catch (error) {
    res.render("category");
    console.log(error.message)
  }
  
 
};
const dashboardPage = async(req, res) => {

  try {
    if(req.user){
      const userid = req.user.id
      const currentuser= await auth.findOne({_id:userid})  
    res.render("dashboard", {currentuser})
    }
    else{
      res.redirect("/login");
    }
    
  } catch (error) {
    
    console.log(error.message)
  }
  
  res.render("dashboard");
};
const faqPage = async(req, res) => {
  try {
    if(req.user){
      const userid = req.user.id
      const currentuser= await auth.findOne({_id:userid})  
    res.render("faq", {currentuser})
    }
    else{
      res.render("faq");
    }
    
  } catch (error) {
    
    console.log(error.message)
  }
  
  res.render("faq")
 
};
const forgotpasswordPage = async (req, res) => {
  try {
    if(req.user){
      const userid = req.user.id
      const currentuser= await auth.findOne({_id:userid})  
    res.render("forgot-password", {currentuser})
    }
    else{
      res.render("/login");
    }
    
  } catch (error) {
   
    console.log(error.message)
  }
  
  res.render("forgot-password");
};
const newindexPage = async(req, res) => {


  try {
      if(req.user){
        const userid = req.user.id
        const currentuser= await auth.findOne({_id:userid})  
        const allProduct = await adsModel.find();
       const product = allProduct.map((item) => {
      return {
        ...item.toObject(),
        newImage:
          item.images[0] ||
          "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/97e18656-64e5-4c22-a981-665ad40856d6/W+NIKE+AL8.png",
      };

      
    });
    res.render("index-2", {product, currentuser})
    
  }else{   

    const allProduct = await adsModel.find();
       const product = allProduct.map((item) => {
      return {
        ...item.toObject(),
        newImage:
          item.images[0] ||
          "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/97e18656-64e5-4c22-a981-665ad40856d6/W+NIKE+AL8.png",
      };
    })
    res.render("index-2", {product})
  }
   } catch (error) {
    console.log(error.message)
    res.render("index-2", { error });
   }
  }

const newestindexPage = async(req, res) => {
  
  try {
    if(req.user){
      const userid = req.user.id
      const currentuser= await auth.findOne({_id:userid})  
    res.render("index-3", {currentuser})
    }
    else{
      res.redirect("index-3");
    }
    
  } catch (error) {
    
    console.log(error.message)
  }
  
  res.render("index-3");

};
const loginPage = (req, res) => {
  res.render("login");
};

const contactpage = async(req, res) => {
  
  try {
    if(req.user){
      const userid = req.user.id
      const currentuser= await auth.findOne({_id:userid})  
    res.render("contact", {currentuser})
    }
    else{
      res.render("contact");
    }
    
  } catch (error) {
    
    console.log(error.message)
  }
  
  
  res.render("contact");
};
const offermessagepage = async (req, res) => {
  
  try {
    if(req.user){
      const userid = req.user.id
      const currentuser= await auth.findOne({_id:userid})  
    res.render("offermessages", {currentuser})
    }
    else{
      res.remder("offermessages");
    }
    
  } catch (error) {
    
    console.log(error.message)
  }
  
  res.render("offermessages");
};
const paymentpage = async(req, res) => {
  res.render("payment");
};
const postAds = async (req, res) => {     
  try {
    if(req.user){
      const userid = req.user.id
      const currentuser= await auth.findOne({_id:userid})  
        const {
          title,
          price,
          message,
          firstName,
          address,
          country,
          category,
          condition,
          brand,
        } = req.body;
        const productField = [
          "title",
          "price",
          "message",
          "firstName",
          "address",
          "category",
          "country",
          "condition",
          "brand",
        ];
        const emptyField = [];
        for (const field of productField) {
          if (!req.body[field] || req.body[field] === "") {
            emptyField.push(field);
          }
        }
        if (emptyField.length > 0) {
          return res.render("post-ads", {
            error: `This field(s) ${emptyField.join(", ")} cannot be empty`,
          });
        }
        const images= []
        if (req.files && Array.isArray(req.files)) {
        const fileArray = req.files.slice(0, 5);
        for (const file of fileArray) {
          const uploadedImage = await cloudinary.uploader.upload(file.path);
          images.push(uploadedImage.secure_url);
        }
        await adsModel.create({
          title: title,
          price: price,
          message: message,
          firstName: firstName,
          address: address,
          country: country,
          category: category,
          condition: condition,
          brand: brand,
          images: images,
        });
        res.render("post-ads", {
          success: "Product posted successfully", currentuser
        })
      } else{ 
        res.redirect("/login")
      }
    }
    }catch (error) {
      console.log(error.message)

      res.render("post-ads", { error: err.message });
    }
};



const getpostadspage = async(req, res) => {
  try {
    if(req.user){
      const userid = req.user.id
      const currentuser= await auth.findOne({_id:userid})  
    res.render("post-ads", {currentuser})
    }
    else{
      res.redirect("/login");
    }
    
  } catch (error) {
    
    console.log(error.message)
  }
  
  

 
};
const privacysettingpage = async(req, res) => {

  
  try {
    if(req.user){
      const userid = req.user.id
      const currentuser= await auth.findOne({_id:userid})  
    res.render("privacy-setting", {currentuser})
    }
    else{
      res.render("privacy-setting");
    }
    
  } catch (error) {
    
    console.log(error.message)
  }
  
  
  res.render("privacy-setting");
};
const registerpage = async(req, res) => {
  
  try {
    if(req.user){
      const userid = req.user.id
      const currentuser= await auth.findOne({_id:userid})  
    res.render("register", {currentuser})
    }
    else{
      res.redirect("register");
    }
    
  } catch (error) {
    console.log(error.message)
  }

  res.render("register");
};

const servicepage = async(req, res) => {
    
  try {
    if(req.user){
      const userid = req.user.id
      const currentuser= await auth.findOne({_id:userid})  
    res.render("service", {currentuser})
    }
    else{
      res.render("service");
    }
    
  } catch (error) {
    
    console.log(error.message)
  }
  
  res.render("service");
};

const singlepostpage = async(req, res) => {
    
  try {
    if(req.user){
      const userid = req.user.id
      const currentuser= await auth.findOne({_id:userid})  
    res.render("single-post", {currentuser})
    }
    else{
      res.render("single-post");
    }
    
  } catch (error) {
    
    console.log(error.message)
  }
  
  
  
  res.render("single-post");
};

const testimonialpage = async(req, res) => {
    
  try {
    if(req.user){
      const userid = req.user.id
      const currentuser= await auth.findOne({_id:userid})  
    res.render("testimonial", {currentuser})
    }
    else{
      res.render("testimonial");
    }
    
  } catch (error) {
    
    console.log(error.message)
  }
  
  
  res.render("testimonial");
};
const pricingpage = async(req, res) => {
    
  try {
    if(req.user){
      const userid = req.user.id
      const currentuser= await auth.findOne({_id:userid})  
    res.render("pricing", {currentuser})
    }
    else{
      res.render("pricing");
    }
    
  } catch (error) {
    
    console.log(error.message)
  }
  
  
 
  res.render("pricing");
};
const aboutpage = async(req, res) => {
    
  try {
    if(req.user){
      const userid = req.user.id
      const currentuser= await auth.findOne({_id:userid})  
    res.render("about", {currentuser})
    }
    else{
      res.render("about");
    }
    
  } catch (error) {
    
    console.log(error.message)
  }
  
  
  
  res.render("about");
};

const adlistinggridpage =async (req, res) => {
    
  try {
    if(req.user){
      const userid = req.user.id
      const currentuser= await auth.findOne({_id:userid})  
    res.render("adlistinggrid", {currentuser})
    }
    else{
      res.render("adlistinggrid");
    }
    
  } catch (error) {
    
    console.log(error.message)
  }
  
  

  res.render("adlistinggrid");
};

const adlistinglistpage = async(req, res) => {

    
  try {
    if(req.user){
      const userid = req.user.id
      const currentuser= await auth.findOne({_id:userid})  
    res.render("adlistinglist", {currentuser})
    }
    else{
      res.render("adlistinglist");
    }
    
  } catch (error) {
    
    console.log(error.message)
  }
  
  

  res.render("adlistinglist");
};
const bloggridfullwidthpage = async(req, res) => {
    
  try {
    if(req.user){
      const userid = req.user.id
      const currentuser= await auth.findOne({_id:userid})  
    res.render("blog-grid-full-width", {currentuser})
    }
    else{
      res.render("blog-grid-full-width");
    }
    
  } catch (error) {
    
    console.log(error.message)
  }
  
  
  
  res.render("blog-grid-full-width");
};

const blogleftsidebarpage = async(req, res) => {
    
  try {
    if(req.user){
      const userid = req.user.id
      const currentuser= await auth.findOne({_id:userid})  
    res.render("blog-left-sidebar", {currentuser})
    }
    else{
      res.render("blog-left-sidebar");
    }
    
  } catch (error) {
    
    console.log(error.message)
  }
  

  res.render("blog-left-sidebar");
};
const accountprofilesettingpage = async(req, res) => {
    
  try {
    if(req.user){
      const userid = req.user.id
      const currentuser= await auth.findOne({_id:userid})  
    res.render("account-profile-setting", {currentuser})
    }
    else{
      res.render("account-profile-setting");
    }
    
  } catch (error) {
    
    console.log(error.message)
  }
  
  
 
  res.render("account-profile-setting");
};
const accountmyadspage = async(req, res) => {
  try {
    if(req.user){
      const userid = req.user.id
      const currentuser= await auth.findOne({_id:userid})  
    res.render("account-myads", {currentuser})
    }
    else{
      res.redirect("/login");
    }
    
  } catch (error) {
    
    console.log(error.message)
  }
  

};
const accountfavouriteadspage = async(req, res) => {
  try {
    if(req.user){
      const userid = req.user.id
      const currentuser= await auth.findOne({_id:userid})  
    res.render("account-favourite-ads", {currentuser})
    }
    else{
      res.redirect("/login");
    }
    
  } catch (error) {
    
    console.log(error.message)
  }
};
const adDetailspage = async(req, res) => {
  try {
    if(req.user){
      const userid = req.user.id
      const currentuser= await auth.findOne({_id:userid})  
      const adsModelId = req.params.id;
      const product = await adsModel.findOne({ _id: adsModelId });
      if (!product) {
        return res.status(404).render("ads-details", { error: "Ad not found" });
      }
  
      res.render("ads-details", { product ,currentuser});

    } else{

      const adsModelId = req.params.id;
      const product = await adsModel.findOne({ _id: adsModelId });
      if (!product) {
        return res.status(404).render("ads-details", { error: "Ad not found" });
      }
  
      res.render("ads-details", { product });

    }
    } catch (error) {
      console.error("Error rendering ads-detail view:", error); // More detailed logging
      res.render("ads-detail", { error: error.message });
    }
    
  };
  const blogPage = async(req, res) => {
    res.render("blog");
  };
  


module.exports = {
  adDetailspage,
  adlistinglistpage,
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
  postAds,
};
