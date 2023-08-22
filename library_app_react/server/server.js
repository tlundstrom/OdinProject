require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.MY_PORT;

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.json({ message: "Welcome to bezkoder application." });
  });

require("./config/mongoose.config");

app.listen(port, () => console.log(`Listening on port: ${process.env.MY_PORT}`));