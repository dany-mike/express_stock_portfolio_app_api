const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    walletName: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "User"
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Wallet', walletSchema)