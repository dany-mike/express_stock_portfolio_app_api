const financialModeling = require('../../services/financialModeling.service');

async function getCompanyProfile(req, res, next) {
    try {
        res.rawResponse = await financialModeling.get(`/profile/${req.params.symbol}?apikey=${process.env.API_KEY_FINANCIAL_MODELING}`)
        res.rawStatus = 200;
        return next();
    } catch(err) {
        res.rawResponse = err.message;
        res.rawStatus = 500;
        return next();
    }
}

module.exports = getCompanyProfile;