const mongoose = require('mongoose');

function dbConnection () {
    mongoose.connect(`${process.env.MONGO_URL}`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err))
}

module.exports = dbConnection

