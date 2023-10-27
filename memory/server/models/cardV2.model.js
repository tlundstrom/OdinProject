const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardV2Schema = new Schema({
  name: {
    type: String,
    required: [true, "Card name is required."],
  },
  url: {
    type: String,
    required: [true, "Card description is required."],
  },
});

module.exports = mongoose.model("V2Cards", CardV2Schema);
