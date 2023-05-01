const mongoose = require('mongoose');
const cartitemSchema = new mongoose.Schema(
{
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
},
{
    timestamps: true
}
);
const Cartitem = mongoose.model('Cartitem', cartitemSchema);
module.exports = Cartitem;