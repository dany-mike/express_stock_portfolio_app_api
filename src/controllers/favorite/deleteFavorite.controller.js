const User = require("../../models/User.model");
const Favorite = require("../../models/Favorite.model");

async function deleteFavorite(req, res, next) {
  const user = await User.findOne({ username: req.params.username });

  if (!user) {
    res.rawStatus = 400;
    res.rawResponse = `Username: ${req.params.username} does not exist`;
    return next();
  }

  const favorite = await Favorite.findOne({
    symbol: req.params.symbol,
    user: user._id,
  });

  if (!favorite) {
    res.rawStatus = 400;
    res.rawResponse = `Favorite ${req.params.symbol} does not exist`;
    return next();
  }

  try {
    await Favorite.findOneAndDelete({
      user: user._id,
      symbol: req.params.symbol,
    });
    res.rawStatus = 200;
    res.rawResponse = `Favorite ${req.params.symbol} removed`;
    return next();
  } catch (err) {
    res.rawStatus = 500;
    res.rawResponse = err.message;
    return next();
  }
}

module.exports = deleteFavorite;
