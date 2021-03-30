const express = require('express');
const app = express();

const cors = require('cors');

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const dbConnection = require('./src/utils/db.util');

const serialization = require("./src/middlewares/serialization.middleware");

const forecast = require('./src/services/forecast.service');
const getIntradayUpdate = require('./src/controllers/marketstack/getIntradayUpdate.controller');
const getEndOfDay = require('./src/controllers/marketstack/getEndOfDay.controller');


// Data Parsing
app.use(express.json());

// Allow access-control-allow-origin
app.use(cors());

// DB connection
dbConnection()

// Routes Import
const authRoute = require('./src/routes/auth.route');

// Auth endpoints
app.use('/user', authRoute);

// Forecast endpoints
app.get('/forecast/price-target/:symbol', forecast.getPriceTargets , serialization);
app.get('/forecast/news-sentiment/:symbol', forecast.getNewsSentimentData , serialization);
app.get('/forecast/trending-stock/', forecast.getTrendingStocks , serialization);

// Marketstack endpoints
app.get('/eod-price/:symbol/', getEndOfDay , serialization);
app.get('/intraday-price/:symbol/', getIntradayUpdate, serialization);

app.listen(process.env.PORT, 'localhost', () => {
    console.log('started');
})
