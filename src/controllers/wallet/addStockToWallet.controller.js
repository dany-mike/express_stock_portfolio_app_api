const User = require("../../models/User.model");
const Company = require("../../models/Company.model");
const Wallet = require("../../models/Wallet.model");
const Value = require("../../models/Value.model");
const marketstack = require("../../services/marketstack.service.js");
const financialModeling = require("../../services/financialModeling.service");

async function addStockToWallet(req, res, next) {
  const user = await User.findOne({ username: req.params.username });

  if (!user) {
    res.rawStatus = 400;
    res.rawResponse = `Username: ${req.params.username} does not exist`;
    return next();
  }

  const wallet = await Wallet.findOne({
    user: user._id,
    _id: req.params.walletId,
  });

  if (!wallet) {
    res.rawStatus = 400;
    res.rawResponse = `WalletId: ${req.params.walletId} does not exist`;
    return next();
  }

  const stockPrice = await marketstack.get(
    `/eod?access_key=${process.env.API_KEY_MARKETSTACK}&symbols=${req.params.symbol}`
  );
  const companyName = await financialModeling.get(
    `/profile/${req.params.symbol}?apikey=${process.env.API_KEY_FINANCIAL_MODELING}`
  );

  const isInMyWallet = await Company.find({ wallet: wallet._id });

  for await (const wallet of isInMyWallet) {
    if (wallet.companyName == companyName[0].companyName) {
      res.rawResponse = "You already have this company in your wallet !";
      res.rawStatus = 400;
      return next();
    }
  }

  const value = await Value.findOne({
    Symbol: req.params.symbol,
  });

  // Create a new company
  const company = new Company({
    companyName: companyName[0].companyName,
    symbol: req.params.symbol,
    sharesNumber: req.body.sharesNumber,
    stockPrice: stockPrice.data[0].open,
    about: companyName[0].description,
    activityArea: value.Sector,
    wallet: wallet._id,
  });

  try {
    await company.save();
    res.rawStatus = 200;
    res.rawResponse = "Company saved into the wallet successfully";
    return next();
  } catch (err) {
    res.rawStatus = 400;
    res.rawResponse = "An error occured";
    return next();
  }
}

module.exports = addStockToWallet;
