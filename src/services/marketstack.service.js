const axios = require('axios');

const marketstack = axios.create({
    baseURL: process.env.API_URL_MARKETSTACK,
    headers: {
        'Authorization': ``
    }
});

const get = (path) => marketstack.get(path).then((response) => response.data).catch((error) => error.message);

module.exports = { get }