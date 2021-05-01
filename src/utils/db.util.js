const mongoose = require('mongoose');

function dbConnection () {
    mongoose.connect(process.env.URL_MONGODB, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})

    const connexion = mongoose.connection;

    connexion.once('open', ()=> {
    console.log('Mongo db connection established successfully');
    })
}

module.exports = dbConnection

