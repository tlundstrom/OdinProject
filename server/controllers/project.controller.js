const Project = require("../models/project.model");

module.exports = {
  createProject: (req, res) => {
    const newProjectObject = new Project(req.body);
    newProjectObject
      .save()
      .then((project) => {
        return res.json(project);
      })
      .catch((err) => {
        return res.status(400).json({ message: "Something went wrong creating a project.", error: err });
      });
  },

  getAllProjects: (req, res) => {
    Project.find({})
      .then((projects) => {
        res.json(projects);
      })
      .catch((err) => {
        return res.status(400).json({ message: "Something went wrong finding all the projects.", error: err });
      });
  },

  getOneProject: (req, res) => {
    Project.findById(req.params.id)
      .then((project) => {
        return res.json(project);
      })
      .catch((err) => {
        return res.status(400).json({ message: "Something went wrong finding that project.", error: err });
      });
  },

  updateOneProject: (req, res) => {
    Project.findByIdAndUpdate(req.params.id, req.body)
      .then((updatedProject) => {
        return res.json(updatedProject);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  },

  deleteOneProject: (req, res) => {
    Project.findByIdAndDelete({ _id: req.params.id })
      .then((deleted) => {
        return res.json(deleted);
      })

      .catch((err) => {
        return res.status(400).json({ message: "Something went wrong deleting that project.", error: err });
      });
  },
};
