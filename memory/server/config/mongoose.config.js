const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/pokecards", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Established Connection.`))
  .catch((err) => console.log(`Errror Establishing Connection.`, err));
