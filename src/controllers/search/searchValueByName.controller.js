const Value = require("../../models/Value.model");
const toUpFLetter = require ('../../utils/toUppercaseFirstLetter.util')

async function searchValuesByName(req, res, next) {
  const value = req.body.Name;
  const uValue = toUpFLetter(value)

  const regex = new RegExp("^" + uValue);
  
  try {
    const values = await Value.find({
      Name: regex,
    });
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
