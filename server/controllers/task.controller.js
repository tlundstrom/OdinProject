const Task = require("../models/task.model");

module.exports = {
  createTask: (req, res) => {
    const newTaskObject = new Task(req.body);
    newTaskObject
      .save()
      .then((task) => {
        return res.json(task);
      })
      .catch((err) => {
        return res.status(400).json({ message: "Something went wrong creating a task.", error: err });
      });
  },

  getAllTasks: (req, res) => {
    Task.find({})
      .then((tasks) => {
        res.json(tasks);
      })
      .catch((err) => {
        return res.status(400).json({ message: "Something went wrong finding all the tasks.", error: err });
      });
  },

  getOneTask: (req, res) => {
    Task.findById(req.params.id)
      .then((task) => {
        return res.json(task);
      })
      .catch((err) => {
        return res.status(400).json({ message: "Something went wrong finding that task.", error: err });
      });
  },

  updateOneTask: (req, res) => {
    Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
      .then((updatedTask) => {
        return res.json(updatedTask);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  },

  deleteOneTask: (req, res) => {
    Task.findByIdAndDelete({ _id: req.params.id })
      .then((deleted) => {
        return res.json(deleted);
      })

      .catch((err) => {
        return res.status(400).json({ message: "Something went wrong deleting that task.", error: err });
      });
  },
};
