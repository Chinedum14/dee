const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const productsMerchandisingSchema = new Schema({
  outletName: String,
  dateAndTime: String,
  userId: String,
  productsMerchandised: [
    {
      productName: String,
      availability: Boolean,
      amountOfItem: String,
      productImage: String,
    }
  ],
})



module.exports = mongoose.model('productsMerchandise', productsMerchandisingSchema);