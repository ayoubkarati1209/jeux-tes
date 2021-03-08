const mongoose = require("mongoose");
const userShema = new mongoose.Schema({
    name: {
        type: String,
        require: 'name is required'
    },
    email: {
        type: String,
        required: 'Email is required !'
    },
    password: {
        type: String,
        required: 'password is required ! '
    },

}, {
    timestamps: true,
});
module.exports = mongoose.model('User', userShema);