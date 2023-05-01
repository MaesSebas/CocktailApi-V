const Book = require('./book');
const User = require('./user');
const Cocktail = require('./cocktail');
const UserData = require('./userdata');
const Order = require('./order');
const Uploadedimage = require('./uploadedimage');

const models = {
    Book,
    User,
    Cocktail,
    UserData,
    Order,
    Uploadedimage
};
module.exports = models;