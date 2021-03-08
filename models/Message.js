const mongoose = require("mongoose");
const messageShema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        require: 'ChatRoom is required',
        ref: "Chatroom",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'chatroom is required ! ',
        ref: "User",
    },
    message: {
        type: String,
        required: "Message is required ! ",
    }
});
module.exports = mongoose.model('Message', messageShema);