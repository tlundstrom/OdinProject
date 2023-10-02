const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ColumnSchema = new Schema({
  name: {
    type: String,
    required: [true, "Project name is required."],
  },
  taskIds: {
    type: Array,
  },
});

module.exports = mongoose.model("Column", ColumnSchema);
