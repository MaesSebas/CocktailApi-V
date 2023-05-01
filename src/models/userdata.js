const mongoose = require('mongoose');
const UserDataSchema = new mongoose.Schema(
{
    username: {
        type: String,
        //required: true,
        //index: { unique: true }
    },
    sex: {
        type: String,
        //required: true,
    },
    name: {
        type: String,
        //required: true
    },
    lastName: {
        type: String,
        //required: true
    },
    phoneNumber: {
        type: String,
        //required: true
    },
    street: {
        type: String,
        //required: true
    },
    number: {
        type: String,
        //required: true
    },
    city: {
        type: String,
        //required: true
    },
    postalCode: {
        type: String,
        //required: true
    },
    country: {
        type: String,
        //required: true
    },
    creditcardName: {
        type: String,
        //required: true
    },
    creditcardLastName: {
        type: String,
        //required: true
    },
    creditcardNumber: {
        type: String,
        //required: true
    },
    pushNotifications: {
        type: String,
        //required: true
    },
    emailUpdates: {
        type: String,
        //required: true
    },
},
{
    timestamps: true
}
);
const UserData = mongoose.model('UserData', UserDataSchema);
module.exports = UserData;