const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({

    companyName: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    symbol: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    sharesNumber: {
        type: Number,
        required: true,
    },
    stockPrice: {
        type: Number,
        required: true,
    },
    about: {
        type: String,
    },
    activityArea: {
        type: String,
        max: 255,
        min: 6
    },
    wallet: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "Wallet"
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Company', companySchema)