const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({

    companyName: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    sharesNumber: {
        type: Number,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    stockPrice: {
        type: Number,
        required: true,
    },
    forecastPrice: {
        type: Number,
        required: true,
    },
    activityArea: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Company', companySchema)