const axios = require('axios');

const financialModeling = axios.create({
    baseURL: process.env.API_URL_FINANCIAL_MODELING,
});

function get(path) {
    return financialModeling.get(path).then((response) => response.data).catch((error) => error.message);
}

module.exports = { get }