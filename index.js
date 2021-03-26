require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

const auth = require('./src/middlewares/auth.middleware');
const serialization = require("./src/middlewares/serialization.middleware");


const {getUsers, userLogin} = require('./src/controllers/users.controller');
const getHistoricalDataStock = require('./src/controllers/getHistoricalDataStock.controller');
const getForecastData = require('./src/controllers/getForecastData.controller');


app.use(express.json());

app.get('/users', getUsers ,serialization);

app.post('/users', userLogin, serialization)

app.get('/forecast/:symbol', getForecastData.getPriceTargets , serialization);

app.get('/historical/:symbol/:from/:to', getHistoricalDataStock , serialization);

app.listen(process.env.PORT, 'localhost', () => {
    console.log('started');
})
