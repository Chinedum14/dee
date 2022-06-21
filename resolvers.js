const lodash = require("lodash");
const Outlet = require("./models/outlet");
const User = require("./models/User");
const Product = require("./models/Product");
const ProductType = require("./models/productType");
const Merchandised = require("./models/productsMerchandised");




const resolvers = {
  Query: {
    getOutlets: async (parent, args, context) => {
      const data = await Outlet.find({ UserId: args.UserId });
      return data;
    },
    getUser: async (parent, args, context) => {
      var data = await User.find({ email: args.email });      
      return data[0];
    },
    getProducts: async (parent, args, context) => {
      var data = await ProductType.find({ name: args.productTypeName });
      data = await Product.find({ productTypeId: data[0]._id})
      return data;
    },
    getProductTypes: async (parent, args, context) => {
      var data = await ProductType.find({});
      return data;
    }, 
    getMerchandisedProducts: async (parent, args, context) => {
      var data = await Merchandised.find({ userId: args.userId });
      return data;
    }
  },
  Mutation: {
    addOutlet: async (parent, args, context) => {
      const data = new Outlet({
        OutletType: args.OutletType,
        OutletChannel: args.OutletChannel,
        OutletName: args.OutletName,
        OutletPhoneNo: args.OutletPhoneNo,
        StreetNumber: args.StreetNumber,
        StreetAddress: args.StreetAddress,
        City: args.City,
        FirstName: args.FirstName,
        LastName: args.LastName,
        PhoneNumber: args.PhoneNumber,
        UserId: args.UserId,
      })

      await data.save();
      return data;
    },
    addUser: async (parent, args, context) => {
      const data = new User({
        userName: args.name,
        email: args.email,
      })

      await data.save();
      return data;
    },
    addProduct: async (parent, args, context) => {
      const data = new Product({
        name: args.name,
        productTypeId: args.productTypeId,
        imageUrl: args.imageUrl,
      })

      await data.save();
      return data;
    }, 
    addProductType: async (parent, args, context) => {
      const data = new ProductType({
        name: args.name,
      })

      await data.save();
      return data;
    },
    addProductMerchandised: async (parent, args, context) => {
      const data = new Merchandised({
        outletName: args.outletName,
        dateAndTime: args.dateAndTime,
        userId: args.userId,
        productsMerchandised: args.productsMerchandised,
      });

      await data.save();
      return data;
    },
  }, 
  Product: {
    productType: async (parent, args, context) => {
      var data = await ProductType.find({ _id: parent.productTypeId });
      return data[0];
    }
  }
};




module.exports = resolvers;