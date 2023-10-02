const Column = require("../models/column.model");

module.exports = {
  getAllColumns: (req, res) => {
    Column.find({})
      .then((columns) => {
        res.json(columns);
      })
      .catch((error) => {
        return res.status(400).json({ message: "Something went wrong finding all the columns.", error: error });
      });
  },
  getOneColumn: (req, res) => {
    Column.findById(req.params.id)
      .then((column) => {
        return res.json(column);
      })
      .catch((error) => {
        return res.status(400).json({ message: "Something went wrong finding that column.", error: error });
      });
  },

  updateOneColumn: (req, res) => {
    Column.findByIdAndUpdate(req.params.id, req.body)
      .then((updatedColumn) => {
        return res.json(updatedColumn);
      })
      .catch((error) => {
        return res.status(400).json(error);
      });
  },
};
