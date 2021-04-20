const express = require('express');
const app = express();

const cors = require('cors');

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const dbConnection = require('./src/utils/db.util');

// Data Parsing
app.use(express.json());

// Allow access-control-allow-origin
app.use(cors());

// DB connection
dbConnection()

// Routes Import
const authRoute = require('./src/routes/auth.route');
const forecastRoute = require('./src/routes/forecast.route');
const marketstackRoute = require('./src/routes/marketstack.route');

// Auth endpoints
app.use('/user', authRoute);

// Forecast endpoints
app.use('/forecast', forecastRoute)

// Marketstack endpoints
app.use('/marketstack', marketstackRoute)


app.listen(process.env.PORT, 'localhost', () => {
    console.log('started');
})
