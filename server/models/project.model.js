const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: [true, "Project name is required."],
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
