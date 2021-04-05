function serialization(req, res) {
    return res.status(res.rawStatus).send(res.rawResponse);
}

module.exports = serialization;
