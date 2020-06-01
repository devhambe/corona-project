const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const schedule = require("node-schedule");
const updateResults = require("./updateResults");
require("dotenv").config();

const app = express();

const PORT = process.env.SERVER_PORT || 5000;

app.use(cors());
app.use(express.json());

const countriesRouter = require("./routes/countries");
const globalRouter = require("./routes/global");

app.use("/countries", countriesRouter);
app.use("/global", globalRouter);

app.post("/mapbox_key", (req, res) => {
	res.status(200).send(process.env.MAPBOX_API_KEY);
});

const uri = process.env.MONGO_URI;
mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then((res) => {
		console.log("Connected to MongoDB database");
	})
	.catch((err) => {
		console.log(err);
	});

const job = schedule.scheduleJob("0 */12 * * *", (fireDate) => {
	if (
		updateResults.updateGlobalResults() &&
		updateResults.updateCountryResults()
	) {
		console.log(`Results updated @ ${fireDate}`);
	}
});

// updateResults.updateGlobalResults();
// updateResults.updateCountryResults();

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
