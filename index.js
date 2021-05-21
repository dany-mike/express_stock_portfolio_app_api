const express = require("express");
const app = express();

// app.set('trust proxy', 1)

const cron = require('node-cron');
const updateAllStocks = require ("./src/utils/updateAllStocks.util")

cron.schedule('0 9 * * *', () => {
  updateAllStocks();
}, {
  scheduled: true,
  timezone:"America/New_York"
});


const cors = require("cors");

const cookieParser = require("cookie-parser");

// Cookie Parser
app.use(cookieParser());

require("dotenv").config();

const dbConnection = require("./src/utils/db.util");

// Data Parsing
app.use(express.json());

// Allow access-control-allow-origin origin === client localhost
app.use(
  cors({
    credentials: true,
    origin: `http://localhost:${process.env.PORT_FRONT}`,
  })
);

// DB connection
dbConnection();

// Routes Import
const authRoute = require("./src/routes/auth.route");
const forecastRoute = require("./src/routes/forecast.route");
const marketstackRoute = require("./src/routes/marketstack.route");
const financialModelingRoute = require("./src/routes/financialmodeling.route");
const walletRoute = require("./src/routes/wallet.route");
const searchRoute = require("./src/routes/search.route");
const stockRoute = require("./src/routes/stock.route");
const favoriteRoute = require("./src/routes/favorite.route");
const twilioRoute = require("./src/routes/twilio.route");

app.get("/", (req, res) => {
  res.send("It works !");
});

// Twilio endpoints
app.use('/twilio', twilioRoute)

// Favorite endpoints
app.use("/favorite", favoriteRoute);

//Stock endpoints
app.use("/stock", stockRoute);

// Auth endpoints
app.use("/user", authRoute);

// Forecast endpoints
app.use("/forecast", forecastRoute);

// Marketstack endpoints
app.use("/marketstack", marketstackRoute);

//Financial Modeling endpoints
app.use("/fm-api", financialModelingRoute);

// Wallet Route
app.use("/wallet", walletRoute);

// Search Route
app.use("/search", searchRoute);


app.listen(process.env.PORT || 3000, 'localhost', () => {
    console.log('started');
})

