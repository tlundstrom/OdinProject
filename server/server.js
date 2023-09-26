const express = require("express");
const cors = require("cors");
const app = express();
const port = "3030";

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./config/mongoose.config");
require("./routes/tasks.routes")(app);
require("./routes/projects.routes")(app);

app.listen(port, () => console.log(`Listening on port: 3030`));
