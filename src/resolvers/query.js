const models = require('../models')
const {
    AuthenticationError,
    ForbiddenError
} = require('apollo-server-express');

module.exports = {
    hello: () => 'Hello world!',
    books: async () => {
        return await models.Book.find()
    },
    cocktails: async () => {
        return await models.Cocktail.find()
    },
    book: async (parent, args) => {
        return await models.Book.findById(args.id);
    },
    orders: async (parent, args) => {
        return await models.Order.find()
    },
    userData: async (parent, args, { models, user }) => {

        // Check if the user is authenticated      
        if (!user) {
            throw new AuthenticationError('You must be logged in to get the userdata');
        }

        return await models.UserData.find();
    },
}