const models = require('../models');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    AuthenticationError,
    ForbiddenError
} = require('apollo-server-express');
require('dotenv').config();


module.exports = {
    addCocktail: async (parent, args, { models }) => {      
        const cocktail = await models.Cocktail.create({
            description: args.description,
            garnish: args.garnish,
            id: args.id,
            ingredients: args.ingredients,
            juice: args.juice,
            name: args.name,
            price: args.price,
            stock: args.stock,
            tags: args.tags,
            tutorialvideo: args.tutorialvideo,
            difficulty: args.difficulty,
            steps: args.steps,
            productvideo: args.productvideo,
            images: args.images,
        });
      
        return cocktail;
    },
    signIn: async (parent, { username, email, password }, { models }) => {
      if (email) {
          email = email.trim().toLowerCase();
      }
      
      const user = await models.User.findOne({ 
        username // no email in the database, but if you have one and want to login using both username or email use this -> $or: [{ email }, { username }]
      });
      
      // if there is no user, throw an authentication error
      if (!user) {
          throw new AuthenticationError('user is not found');          
      } else {
          console.log(user);
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new AuthenticationError('password is incorrect');          
      }

      // create and return the json web token
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    },
    addOrder: async (parent, args, { models }) => {
      try {
        const { username } = args;
        const user = await models.User.findOne({ username });
        //const user = await models.User.findOne({ username });

        if (!user) {
          throw new Error("User not found");
        }

        const newOrder = {
          date: args.date,
          orderMethod: args.orderMethod,
          totalprice: args.totalprice,
          orderId: args.orderId,
          items: args.items.map((item) => ({
            image: item.image,
            title: item.title,
            size: item.size,
            quantity: item.quantity,
            itemprice: item.itemprice,
            totalprice: item.totalprice,
          })),
        };
        
        // Add the new order object to the orders array
        user.orders.push(newOrder);
        await user.save();
        
        return newOrder;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    editData: async (parent, args, { models }) => {
      const { username, newData } = args;
      try {
        const user = await models.User.findOne({ username });
        if (!user) {
          throw new Error(`User ${username} not found`);
        }
    
        const updatedUserdata = { ...user.userdata.toObject(), ...newData };
        const changedFields = Object.keys(newData).filter(key => {
          return updatedUserdata[key] !== user.userdata[key];
        });
    
        const updates = {};
        changedFields.forEach(field => {
          updates[`userdata.${field}`] = updatedUserdata[field];
        });
    
        const updatedUser = await models.User.findOneAndUpdate(
          { username },
          { $set: updates },
          { new: true }
        );
    
        return updatedUser;
      } catch (err) {
        throw new Error(`Failed to update user data: ${err.message}`);
      }
    },
    addPhoto: async (parent, args, { models }) => {
      const { username, filename } = args;
      //console.log(filename);
      const user = await models.User.findOne({ username });
      if (!user) {
        throw new Error(`User ${username} not found`);
      }
    
      const newPhoto = {
        name: filename,
      };
      
      // Add the new photo object to the uploadedPictures array
      user.uploadedPictures.push(newPhoto);
    
      try {
        await user.save();
      } catch (error) {
        console.log(error);
        return false;
      }
    
      return true;
    },
    deletePhoto: async (parent, args, { models }) => {
      const { username, filename } = args;
      //console.log(filename);
      const user = await models.User.findOne({ username });
      if (!user) {
        throw new Error(`User ${username} not found`);
      }
    
      // Find the index of the photo to be deleted
      const photoIndex = user.uploadedPictures.findIndex(photo => photo.name === filename);
    
      if (photoIndex === -1) {
        throw new Error(`Photo ${filename} not found`);
      }
    
      // Remove the photo from the array
      user.uploadedPictures.splice(photoIndex, 1);
    
      try {
        await user.save();
      } catch (error) {
        console.log(error);
        return false;
      }
    
      return true;
    },
    createUser: async (parent, args, { models }) => {
        // Hash the password
      const hashedPassword = await bcrypt.hash(args.password, 10);

      console.log(args.userData);

      // Create user and related data
      const user = await models.User.create({
        username: args.username,
        email: args.email,
        password: hashedPassword,
        userdata: {
          sex: args.userData.sex,
          name: args.userData.name,
          lastName: args.userData.lastName,
          phoneNumber: args.userData.phoneNumber,
          street: args.userData.street,
          number: args.userData.number,
          city: args.userData.city,
          postalCode: args.userData.postalCode,
          country: args.userData.country,
          creditcardName: args.userData.creditcardName,
          creditcardLastName: args.userData.creditcardLastName,
          creditcardNumber: args.userData.creditcardNumber,
          pushNotifications: args.userData.pushNotifications,
          emailUpdates: args.userData.emailUpdates,
        },
        cartitems: args.cartitems.map((item) => ({
          image: item.image,
          title: item.title,
          size: item.size,
          quantity: item.quantity,
          itemprice: item.itemprice,
          totalprice: item.totalprice,
        })),
        orders: args.orders.map((order) => ({
          date: order.date,
          orderMethod: order.orderMethod,
          orderId: order.orderId,
          totalprice: order.totalprice,
          items: order.items.map((item) => ({
            image: item.image,
            title: item.title,
            size: item.size,
            quantity: item.quantity,
            itemprice: item.itemprice,
            totalprice: item.totalprice,
          })),
        })),
        uploadedPictures: args.uploadedPictures.map((picture) => ({
          name: picture.name,
        })),
      });

      return user;
    }
}