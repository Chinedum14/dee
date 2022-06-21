const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const productSchema = new Schema({
  name: String,
  productTypeId: String,
  imageUrl: String,
})



module.exports = mongoose.model('Product', productSchema);