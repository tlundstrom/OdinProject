const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/todos", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Established Connection.`))
  .catch((err) => console.log(`Errror Establishing Connection.`, err));
