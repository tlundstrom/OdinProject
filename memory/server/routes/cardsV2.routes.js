const CardControllerV2 = require("../controllers/cardV2.controller");

module.exports = (app) => {
  app.get("/api/cardsV2/", CardControllerV2.getAllCardsV2);
};
