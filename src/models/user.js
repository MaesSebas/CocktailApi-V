const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema(
{
    username: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    },
    userdata: {
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
    cartitems: [{
        image: {
            type: String
        },
        title: {
            type: String
        },
        size: {
            type: String
        },
        quantity: {
            type: String
        },
        itemprice: {
            type: String
        },
        totalprice: {
            type: String
        }
    }],
    orders: [{
        date: {
            type: String
        },
        orderMethod: {
            type: String
        },
        orderId: {
            type: String
        },
        totalprice: {
            type: String
        },
        items: [{
            image: {
                type: String
            },
            title: {
                type: String
            },
            size: {
                type: String
            },
            quantity: {
                type: String
            },
            itemprice: {
                type: String
            },
            
            totalprice: {
                type: String
            }
            
        }],
    }],
    uploadedPictures: [{
        name: {
            type: String
        },
    }],
},
{
    timestamps: true
}
);
const User = mongoose.model('User', UserSchema);
module.exports = User;