const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const outletSchema = new Schema({
  OutletType: String,
  OutletChannel: String,
  OutletName: String,
  OutletPhoneNo: String,
  StreetNumber: String,
  StreetAddress: String,
  City: String,
  FirstName: String,
  LastName: String,
  PhoneNumber: String,
  UserId: String,
})



module.exports = mongoose.model('Outlet', outletSchema);