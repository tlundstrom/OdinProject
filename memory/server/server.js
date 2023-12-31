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
require("./routes/cards.routes")(app);
require("./routes/cardsV2.routes")(app);

app.listen(port, () => console.log(`Listening on port: 3030`));
