function serialization(req, res) {
    return res.send(res.rawResponse);
}

module.exports = serialization;
