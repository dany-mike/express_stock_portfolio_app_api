const express = require('express');
const app = express();

const cors = require('cors');
const cookieParser = require('cookie-parser')


if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const dbConnection = require('./src/utils/db.util');

// Cookie Parser
app.use(cookieParser())

// Data Parsing
app.use(express.json());

// Allow access-control-allow-origin origin === client localhost 
app.use(cors({credentials: true, origin: `http://localhost:${process.env.PORT_FRONT}`}));

// DB connection
dbConnection();

// Routes Import
const authRoute = require('./src/routes/auth.route');
const forecastRoute = require('./src/routes/forecast.route');
const marketstackRoute = require('./src/routes/marketstack.route');
const financialModelingRoute = require('./src/routes/financialmodeling.route');
const walletRoute = require('./src/routes/wallet.route');

// Auth endpoints
app.use('/user', authRoute);

// Forecast endpoints
app.use('/forecast', forecastRoute);

// Marketstack endpoints
app.use('/marketstack', marketstackRoute);

//Financial Modeling endpoints
app.use('/fm-api', financialModelingRoute);

// Wallet Route
app.use('/wallet', walletRoute);

app.listen(process.env.PORT, 'localhost', () => {
    console.log('started');
})