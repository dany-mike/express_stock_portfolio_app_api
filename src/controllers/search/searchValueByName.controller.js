const Value = require("../../models/Value.model");
const toUpFLetter = require("../../utils/toUppercaseFirstLetter.util");

async function searchValuesByName(req, res, next) {
  const value = req.query.name;
  const sector = req.query.sector;

  if (value === "") {
    res.rawStatus = 200;
    res.rawResponse = [];
    return next();
  }

  try {
    if (req.query.sector && req.query.name) {
      const uValue = toUpFLetter(value);
      const regex = new RegExp("^" + uValue);

      const values = await Value.find({
        Name: regex,
        Sector: sector,
      }).limit(7);
      res.rawStatus = 200;
      res.rawResponse = values;
      return next();
    }
    if (req.query.name) {
      const uValue = toUpFLetter(value);
      const regex = new RegExp("^" + uValue);

      const values = await Value.find({
        Name: regex,
      }).limit(7);
      res.rawStatus = 200;
      res.rawResponse = values;
      return next();
    }
    if (req.query.sector) {
      const values = await Value.find({
        Sector: sector,
      }).limit(7);
      res.rawStatus = 200;
      res.rawResponse = values;
      return next();
    }
  } catch (err) {
    res.rawStatus = 500;
    res.rawResponse = err.message;
    return next();
  }
}

module.exports = searchValuesByName;
