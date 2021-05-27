async function updateAllStocks() {
  const Company = require("../models/Company.model");
  const marketstack = require("../services/marketstack.service");
  const tipranksApi = require("tipranks-api-v2");

  const companies = await Company.find();

  for await (const company of companies) {
    const stockPrice = await marketstack.get(
      `/eod?access_key=${process.env.API_KEY_MARKETSTACK}&symbols=${company.symbol}`
    );


    const update = {
      stockPrice: stockPrice.data[0].open,
    };

    const filter = {
      _id: company._id,
    };

    await Company.findOneAndUpdate(filter, update);
  }
}

module.exports = updateAllStocks;
