const mongoose = require('mongoose');

const valueSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    Sector: {
        type: String,
        required: true,
        max: 255,
        min: 6
    }, 
    Symbol: {
        type: String,
        required: true,
        max: 255,
        min: 6
    }
})

module.exports = mongoose.model('Value', valueSchema)