const Card = require("../models/card.model");

module.exports = {
  getAllCards: (req, res) => {
    Card.find({})
      .then((cards) => {
        res.json(cards);
      })
      .catch((err) => {
        return res.status(400).json({ message: "Something went wrong finding all the items.", error: err });
      });
  },
};
