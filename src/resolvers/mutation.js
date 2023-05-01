const models = require('../models');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    AuthenticationError,
    ForbiddenError
} = require('apollo-server-express');
require('dotenv').config();

const CartItem = require('../models/cartitem');
const newCartItem = new CartItem({
    image: 'https://example.com/image.jpg',
    title: 'testxample Ite',
    size: 'Medium',
    quantity: 2,
    itemprice: 9.99,
    totalprice: 19.98
});


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
    addOrder: async (parent, args, { models }) => {
        const order = await models.Order.create({
            orderid: args.orderid,
            cartitems: args.cartitems,
            total: args.total,
            deliveryoption: args.deliveryoption
        });
        
        return order;
    },
    addUserData: async (parent, args, { models }) => {
        const userData = await models.UserData.create({
          username: args.username,
          sex: args.sex,
          name: args.name,
          lastName: args.lastName,
          phoneNumber: args.phoneNumber,
          street: args.street,
          number: args.number,
          city: args.city,
          postalCode: args.postalCode,
          country: args.country,
          creditcardName: args.creditcardName,
          creditcardLastName: args.creditcardLastName,
          creditcardNumber: args.creditcardNumber,
          pushNotifications: args.pushNotifications,
          emailUpdates: args.emailUpdates
        });
      
        return userData;
    },
    addBook: async (parent, args, { models, user }) => {
        // Check if the user is authenticated      
        if (!user) {
          throw new AuthenticationError('You must be logged in to create a book');
        }
      
        // Create the book
        const book = await models.Book.create({
          title: args.title,
          author: args.author
        });
      
        return book;
    },
    updateBook: async (parent, { id, title, author }, { models }) => {
        return await models.Book.findOneAndUpdate(
        {
            _id: id,
        },
        {
        $set: {
            title,
            author
        }
        },
        {
        new: true
        }
        );
    },
    deleteBook: async (parent, { id }, { models }) => {
        try {
            await models.Book.findOneAndRemove({ _id: id});
            return true;
        } catch (err) {
            return false;
        }
       },
       signUp: async (parent, { username, email, password }, { models }) => {
        // normalize email address
        email = email.trim().toLowerCase();
        // hash the password
        const hashed = await bcrypt.hash(password, 10);
        // create the gravatar url
        const avatar = gravatar(email);
        try {
            const user = await models.User.create({
                username,
                email,
                password: hashed
        });
            // create and return the json web token
            return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        } catch (err) {
            console.log(err);
            throw new Error('Error creating account');
        }
       },
       signIn: async (parent, { username, email, password }, { models }) => {
        if (email) {
            email = email.trim().toLowerCase();
        }
        const user = await models.User.findOne({
            $or: [{ email }, { username }]
        });
        // if there is no user, throw an authentication error
        if (!user) {
            throw new AuthenticationError('Error signing in');
        }
        // if the passwords don't match, throw an authentication error
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new AuthenticationError('Error signing in');
        }
        // create and return the json web token
        return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    }

}