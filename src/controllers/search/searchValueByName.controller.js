const Value = require("../../models/Value.model");
const toUpFLetter = require ('../../utils/toUppercaseFirstLetter.util')

async function searchValuesByName(req, res, next) {
  const value = req.query.name;

  if(value === "") {
    res.rawStatus = 200;
    res.rawResponse = [];
    return next();
  }
  
  const uValue = toUpFLetter(value)

  try {
    const regex = new RegExp("^" + uValue);
    const values = await Value.find({
      Name: regex,
    }).limit(7)
    res.rawStatus = 200;
    res.rawResponse = values;
    return next();
  } catch (err) {
    res.rawStatus = 500;
    res.rawResponse = err.message;
    return next();
  }
}

module.exports = searchValuesByName;
