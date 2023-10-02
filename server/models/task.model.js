const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: [true, "Task name is required."],
  },
  description: {
    type: String,
    required: [true, "Task description is required."],
  },
  dueDate: {
    type: Date,
    required: [true, "Task due date is required."],
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  complete: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
