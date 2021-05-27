const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({

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
    user: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "User"
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Favorite', favoriteSchema)