const mongoose = require("mongoose")

const AdSchema = new mongoose.Schema({
   
  title: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },

   name: { type: String, required: true },
   phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String , required : true},
    images: {
      type: [String],
    },


  datePosted: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Ad", AdSchema);

