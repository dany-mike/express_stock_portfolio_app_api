require('dotenv').config();

const express = require('express');
const app = express();
const auth = require('./src/middlewares/auth.middleware');
const {getUsers, userLogin} = require('./src/controllers/users.controller');
const serialization = require("./src/middlewares/serialization.middleware");
const getHistoricalDataStock = require('./src/controllers/getHistoricalDataStock.controller');

app.use(express.json())

// List of users URI
app.get('/users', getUsers ,serialization);

app.post('/users', userLogin, serialization)

// Historical Data URI
app.get('/historical/:symbol/:from/:to', getHistoricalDataStock , serialization);

app.listen(3000, 'localhost', () => {
    console.log('started');
})
