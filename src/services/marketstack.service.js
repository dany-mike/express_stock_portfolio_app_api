const axios = require('axios');

const marketstack = axios.create({
    baseURL: process.env.API_URL_MARKETSTACK,
});

function get(path) {
    return marketstack.get(path).then((response) => response.data).catch((error) => error.message);
}

module.exports = { get }