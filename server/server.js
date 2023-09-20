const express = require("express");
const cors = require("cors");
const app = express();
const port = "27017";

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./config/mongoose.config");
require("./routes/tasks.routes")(app);

app.listen(port, () => console.log(`Listening on port: 27017`));
