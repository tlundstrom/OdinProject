const CardController = require("../controllers/card.controller");

module.exports = (app) => {
  app.get("/api/cards/", CardController.getAllCards);
};
