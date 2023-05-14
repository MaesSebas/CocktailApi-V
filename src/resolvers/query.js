const models = require('../models')
const {
    AuthenticationError,
    ForbiddenError
} = require('apollo-server-express');

module.exports = {
    cocktails: async () => {
        return await models.Cocktail.find()
    },
    user: async () => {
        return await models.User.find()
    },
    getUserByUsername: async (_, { username }) => {
        return await models.User.findOne({ username });
    }
}