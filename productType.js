const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const productTypeSchema = new Schema({
  name: String,
})



module.exports = mongoose.model('ProductType', productTypeSchema);