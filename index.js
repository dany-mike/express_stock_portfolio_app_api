require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

const serialization = require("./src/middlewares/serialization.middleware");

const forecast = require('./src/services/forecast.service');
const getHistoricalDataStockController = require('./src/controllers/getHistoricalDataStock.controller');

// Data Parsing
app.use(express.json());

// Allow access-control-allow-origin
app.use(cors());

app.get('/forecast/price-target/:symbol', forecast.getPriceTargets , serialization);
app.get('/forecast/news-sentiment/:symbol', forecast.getNewsSentimentData , serialization);
app.get('/forecast/trending-stock/', forecast.getTrendingStocks , serialization);

app.get('/historical/:symbol/:from/:to', getHistoricalDataStockController.getHistoricalDataStock , serialization);

app.listen(process.env.PORT, 'localhost', () => {
    console.log('started');
})
