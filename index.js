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
dbConnection();

// Routes Import
const authRoute = require('./src/routes/auth.route');
const forecastRoute = require('./src/routes/forecast.route');
const marketstackRoute = require('./src/routes/marketstack.route');
const financialModelingRoute = require('./src/routes/financialmodeling.route');
const companyRoute = require('./src/routes/company.route');
const walletRoute = require('./src/routes/wallet.route');

// Auth endpoints
app.use('/user', authRoute);

// Forecast endpoints
app.use('/forecast', forecastRoute);

// Marketstack endpoints
app.use('/marketstack', marketstackRoute);

//Financial Modeling endpoints
app.use('/fm-api', financialModelingRoute);

// Stock route
app.use("/company", companyRoute);

// Get Wallet Route
app.use('/wallet', walletRoute);

app.listen(process.env.PORT, 'localhost', () => {
    console.log('started');
})
