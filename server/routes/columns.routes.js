const ColumnController = require("../controllers/column.controller");

module.exports = (app) => {
  app.get("/api/columns/", ColumnController.getAllColumns);
  app.get("/api/columns/:id", ColumnController.getOneColumn);
  app.put("/api/columns/:id", ColumnController.updateOneColumn);
};
