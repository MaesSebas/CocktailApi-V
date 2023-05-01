const mongoose = require('mongoose');
const UploadedimageSchema = new mongoose.Schema(
{
    title: {
        type: [String],
        required: true,
    }
},
{
    timestamps: true
}
);
const Uploadedimage = mongoose.model('Uploadedimage', UploadedimageSchema);
module.exports = Uploadedimage;