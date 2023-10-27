const CardV2 = require("../models/cardV2.model");

module.exports = {
  getAllCardsV2: (req, res) => {
    CardV2.find({})
      .then((cards) => {
        res.json(cards);
      })
      .catch((err) => {
        return res.status(400).json({ message: "Something went wrong finding all the items.", error: err });
      });
  },
};
