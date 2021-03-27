require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

const auth = require('./src/middlewares/auth.middleware');
const serialization = require("./src/middlewares/serialization.middleware");


const {getUsers, userLogin} = require('./src/controllers/users.controller');
const getHistoricalDataStock = require('./src/controllers/getHistoricalDataStock.controller');
const forecast = require('./src/services/forecast.service')

// Data Parsing
app.use(express.json());

// Allow access-control-allow-origin
app.use(cors());

app.get('/users', getUsers ,serialization);

app.post('/users', userLogin, serialization);

app.get('/forecast/price-target/:symbol', forecast.getPriceTargets , serialization);
app.get('/forecast/news-sentiment/:symbol', forecast.getNewsSentimentData , serialization);
app.get('/forecast/trending-stock/', forecast.getTrendingStocks , serialization);


app.get('/historical/:symbol/:from/:to', getHistoricalDataStock , serialization);

app.listen(process.env.PORT, 'localhost', () => {
    console.log('started');
})
