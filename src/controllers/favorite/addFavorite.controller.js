const User = require("../../models/User.model");
const Favorite = require("../../models/Favorite.model");
const marketstack = require("../../services/marketstack.service.js");
const financialModeling = require("../../services/financialModeling.service");
const tipranksApi = require("tipranks-api-v2");
const nodemailer = require("nodemailer");

async function addFavorite(req, res, next) {
  const user = await User.findOne({ username: req.params.username });

  if (!user) {
    res.rawStatus = 400;
    res.rawResponse = `Username: ${req.params.username} does not exist`;
    return next();
  }

  const stockPrice = await marketstack.get(
    `/eod?access_key=${process.env.API_KEY_MARKETSTACK}&symbols=${req.params.symbol}`
  );
  const companyName = await financialModeling.get(
    `/profile/${req.params.symbol}?apikey=${process.env.API_KEY_FINANCIAL_MODELING}`
  );
  const forecastPrice = await tipranksApi
    .getPriceTargets(req.params.symbol)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error));

  const isFav = await Favorite.find({ user: user._id });

  for (const fav of isFav) {
    if (fav.companyName == companyName[0].companyName) {
      res.rawResponse = "You already have this company in your favorite !";
      res.rawStatus = 400;
      return next();
    }
  }

  // Add to favorite
  const favorite = new Favorite({
    companyName: companyName[0].companyName,
    symbol: req.params.symbol,
    stockPrice: stockPrice.data[0].open,
    about: companyName[0].description,
    activityArea: companyName[0].industry,
    forecastPrice: forecastPrice.priceTargets.mean,
    user: user._id,
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.EMAIL_NODEMAILER}`,
      pass: `${process.env.PASSWORD_NODEMAILER}`
    }
  });
  
  const mailOptions = {
    from: `${process.env.EMAIL_NODEMAILER}`,
    to: `${user.email}`,
    subject: `${companyName[0].companyName} stock has been added to your favorites`,
    html: `<p>Hello ${req.params.username},</p>
    <p>Today ${req.params.symbol} price share at the open was 
    $${stockPrice.data[0].open}</p>
    <p>The ${req.params.symbol} forecast price for one year is $${forecastPrice.priceTargets.mean.toFixed(2)}</p>
    <p>You'll receive a daily report of the ${req.params.symbol} stock price and stock forecast</p>
    <p>Remove ${req.params.symbol} of your favorites to stop receiving daily report</p>`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  try {
    await favorite.save();
    res.rawStatus = 200;
    res.rawResponse = "Company add into favorite";
    return next();
  } catch (err) {
    res.rawStatus = 500;
    res.rawResponse = err.message;
    return next();
  }
}

module.exports = addFavorite;
