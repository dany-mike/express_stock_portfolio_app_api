const router = require("express").Router();
const serialization = require("../middlewares/serialization.middleware");
const verify = require("../middlewares/verifyToken.middleware");
const getFavorites = require("../controllers/favorite/getFavorites.controller");
const addFavorite = require("../controllers/favorite/addFavorite.controller");
const deleteFavorite = require("../controllers/favorite/deleteFavorite.controller");

router.get("/:username", verify, getFavorites, serialization);

router.post("/add/:username/:symbol", verify, addFavorite, serialization);

router.delete(
  "/delete/:username/:symbol",
  verify,
  deleteFavorite,
  serialization
);

module.exports = router;
