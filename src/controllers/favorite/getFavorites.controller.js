const User = require("../../models/User.model");
const Favorite = require("../../models/Favorite.model");

async function getFavorites(req, res, next) {
  const user = await User.findOne({ username: req.params.username });

  if (!user) {
    res.rawStatus = 400;
    res.rawResponse = `Username: ${req.params.username} does not exist`;
    return next();
  }

  try {
    const favorites = await Favorite.find({
      user: user._id,
    });
    res.rawStatus = 200;
    res.rawResponse = favorites;
    return next();
  } catch (err) {
    console.log("error");
    res.rawStatus = 500;
    res.rawResponse = err.message;
    return next();
  }
}

module.exports = getFavorites;
