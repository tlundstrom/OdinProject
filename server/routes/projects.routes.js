const ProjectController = require("../controllers/project.controller");

module.exports = (app) => {
  app.post("/api/projects/", ProjectController.createProject);
  app.get("/api/projects/", ProjectController.getAllProjects);
  app.get("/api/projects/:id", ProjectController.getOneProject);
  app.put("/api/projects/:id", ProjectController.updateOneProject);
  app.delete("/api/projects/:id", ProjectController.deleteOneProject);
};
