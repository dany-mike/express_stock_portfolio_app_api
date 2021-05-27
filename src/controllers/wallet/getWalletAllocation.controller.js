const User = require("../../models/User.model");
const Company = require("../../models/Company.model");
const Wallet = require("../../models/Wallet.model");

async function getWalletAllocation(req, res, next) {
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

  try {
    ///////////////////////////////////////////////////////////////
    /// Calcul each sector

    let totalInvested = 0;

    const companies = await Company.find({ wallet: wallet._id });

    for await (const company of companies) {
      totalInvested += company.stockPrice * company.sharesNumber;
    }

    let indexFundInvested = 0;

    const companiesIndex = await Company.find({
      wallet: wallet._id,
      activityArea: "IndexFund ETF",
    });


    if (companiesIndex) {
      for (const company of companiesIndex) {
        indexFundInvested += company.stockPrice * company.sharesNumber;
      }
    }

    let healthCareInvested = 0;

    const companiesHealthCare = await Company.find({
      wallet: wallet._id,
      activityArea: "Health Care",
    });

    if (companiesHealthCare) {
      for (const company of companiesHealthCare) {
        healthCareInvested += company.stockPrice * company.sharesNumber;
      }
    }

    let financialsInvested = 0;

    const companiesFinancials = await Company.find({
      wallet: wallet._id,
      activityArea: "Financials",
    });

    if (companiesFinancials) {
      for (const company of companiesFinancials) {
        financialsInvested += company.stockPrice * company.sharesNumber;
      }
    }

    let consumerStaplesInvested = 0;

    const companiesStaples = await Company.find({
      wallet: wallet._id,
      activityArea: "Consumer Staples",
    });

    if (companiesStaples) {
      for (const company of companiesStaples) {
        consumerStaplesInvested += company.stockPrice * company.sharesNumber;
      }
    }

    let consumerDiscretionary = 0;

    const companiesDiscrotionary = await Company.find({
      wallet: wallet._id,
      activityArea: "Consumer Discretionary",
    });

    if (companiesDiscrotionary) {
      for (const company of companiesDiscrotionary) {
        consumerDiscretionary += company.stockPrice * company.sharesNumber;
      }
    }

    let industrialsInvested = 0;

    const companiesIndustrial = await Company.find({
      wallet: wallet._id,
      activityArea: "Industrials",
    });

    if (companiesIndustrial) {
      for (const company of companiesIndustrial) {
        industrialsInvested += company.stockPrice * company.sharesNumber;
      }
    }

    let informationTechnology = 0;

    const companiesInformationTechnology = await Company.find({
      wallet: wallet._id,
      activityArea: "Information Technology",
    });

    if (companiesInformationTechnology) {
      for (const company of companiesInformationTechnology) {
        informationTechnology += company.stockPrice * company.sharesNumber;
      }
    }

    let realEstate = 0;

    const companiesRealEstate = await Company.find({
      wallet: wallet._id,
      activityArea: "Real Estate",
    });

    if (companiesRealEstate) {
      for (const company of companiesRealEstate) {
        realEstate += company.stockPrice * company.sharesNumber;
      }
    }

    let energy = 0;

    const companiesEnergy = await Company.find({
      wallet: wallet._id,
      activityArea: "Energy",
    });

    if (companiesEnergy) {
      for (const company of companiesEnergy) {
        energy += company.stockPrice * company.sharesNumber;
      }
    }

    let communicationServices = 0;

    const companiesCommunicationServices = await Company.find({
      wallet: wallet._id,
      activityArea: "Communication Services",
    });

    if (companiesCommunicationServices) {
      for (const company of companiesCommunicationServices) {
        communicationServices += company.stockPrice * company.sharesNumber;
      }
    }

    let materials = 0;

    const companiesMaterials = await Company.find({
      wallet: wallet._id,
      activityArea: "Materials",
    });

    if (companiesMaterials) {
      for (const company of companiesMaterials) {
        materials += company.stockPrice * company.sharesNumber;
      }
    }

    let utilities = 0;

    const companiesUtilities = await Company.find({
      wallet: wallet._id,
      activityArea: "Utilities",
    });

    if (companiesUtilities) {
      for (const company of companiesUtilities) {
        utilities += company.stockPrice * company.sharesNumber;
      }
    }

    /// End calcul
    ////////////////////////////////////////////////////////////////
    function calculatePercentage(total, sectorValue) {
        return (sectorValue/total) * 100
    }

    // API response
    const arrayAllocation = [
      {
        totalInvested,
      },
      {
        indexFundInvested,
        investPerc: calculatePercentage(totalInvested, indexFundInvested).toFixed(2)
      },
      {
        healthCareInvested,
        investPerc: calculatePercentage(totalInvested, healthCareInvested).toFixed(2)
      },
      {
        financialsInvested,
        investPerc: calculatePercentage(totalInvested, financialsInvested).toFixed(2)
      },
      {
        utilities,
        investPerc: calculatePercentage(totalInvested, utilities).toFixed(2)
      },
      {
        materials,
        investPerc: calculatePercentage(totalInvested, materials).toFixed(2)
      },
      {
        consumerDiscretionary,
        investPerc: calculatePercentage(totalInvested, consumerDiscretionary).toFixed(2)
      },
      {
        consumerStaplesInvested,
        investPerc: calculatePercentage(totalInvested, consumerStaplesInvested).toFixed(2)
      },
      {
        industrialsInvested,
        investPerc: calculatePercentage(totalInvested, industrialsInvested).toFixed(2)
      },
      {
        realEstate,
        investPerc: calculatePercentage(totalInvested, realEstate).toFixed(2)
      },
      {
        informationTechnology,
        investPerc: calculatePercentage(totalInvested, informationTechnology).toFixed(2)
      },
      {
        energy,
        investPerc: calculatePercentage(totalInvested, energy).toFixed(2)
      },
      {
        communicationServices,
        investPerc: calculatePercentage(totalInvested, communicationServices).toFixed(2)
      },
    ];

    res.rawStatus = 200;
    res.rawResponse = arrayAllocation;
    return next();
  } catch (err) {
    console.log("error");
    res.rawStatus = 500;
    res.rawResponse = err.message;
    return next();
  }
}

module.exports = getWalletAllocation;
