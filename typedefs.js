const { gql } = require("apollo-server-express");





const typeDefs = gql`
type Query {
  getOutlets(UserId: String): [Outlet]
  getUser(email: String): User
  getProducts(productTypeName: String): [Product]  
  getProductTypes: [ProductType]
  getMerchandisedProducts(userId: String): [ProductMerchandising]
}

type Mutation {
  addOutlet(
    OutletType: String, OutletChannel: String, OutletName: String,
    OutletPhoneNo: String, StreetNumber: String, StreetAddress: String,
    City: String, FirstName: String, LastName: String, PhoneNumber: String, 
    UserId: String, 
  ): Outlet
  addUser(name: String, email: String): User
  addProduct(
    name: String, productTypeId: String, 
    imageUrl: String
  ): Product
  addProductType(name: String): ProductType
  addProductMerchandised(
    outletName: String, dateAndTime: String, userId: String
    productsMerchandised: [PMListInput]
  ): ProductMerchandising
}

type Outlet {
  OutletType: String
  OutletChannel: String
  OutletName: String
  OutletPhoneNo: String
  StreetNumber: String
  StreetAddress: String
  City: String
  FirstName: String
  LastName: String
  PhoneNumber: String
  UserId: String
}

type User {
  userName: String
  email: String
  _id: String
}

type Product {
  name: String
  _id: String
  productTypeId: String
  imageUrl: String
  productType: ProductType
}

type ProductType {
  name: String
  _id: String
}

type ProductMerchandising {
  outletName: String
  dateAndTime: String
  userId: String
  productsMerchandised: [PMList]
}

type PMList {
  productName: String
  availability: Boolean
  amountOfItem: String
  productImage: String
}

input PMListInput {
  productName: String
  availability: Boolean
  amountOfItem: String
  productImage: String
}
`





module.exports = typeDefs;