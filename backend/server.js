const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
	console.log("Connected to MongoDB database");
});

const countriesRouter = require("./routes/countries");

app.use("/countries", countriesRouter);

app.listen(5000, () => {
	console.log("Server started");
});
