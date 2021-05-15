async function updateAllStocks() {
  const Company = require("../models/Company.model");
  const marketstack = require("../services/marketstack.service");
  const tipranksApi = require("tipranks-api-v2");

  const companies = Company.find();

  console.log("update all stocks")

  for await (const company of companies) {
    const stockPrice = await marketstack.get(
      `/eod?access_key=${process.env.API_KEY_MARKETSTACK}&symbols=${company.symbol}`
    );
    const forecastPrice = await tipranksApi
      .getPriceTargets(company.symbol)
      .then((response) => {
        return response;
      })
      .catch((error) => console.log(error));

    const update = {
      stockPrice: stockPrice.data[0].open,
      forecastPrice: forecastPrice.priceTargets.mean,
    };

    const filter = {
      _id: company._id,
    };

    await Company.findOneAndUpdate(filter, update);
  }
}

module.exports = updateAllStocks;
