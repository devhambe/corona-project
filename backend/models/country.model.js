const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const countrySchema = new Schema({
	country: {
		type: String,
		required: true,
	},
	countryCode: {
		type: String,
		required: true,
	},
	countrySlug: {
		type: String,
		required: true,
	},
	newCases: {
		type: Number,
		required: true,
	},
	totalCases: {
		type: Number,
		required: true,
	},
	newDeaths: {
		type: Number,
		required: true,
	},
	totalDeaths: {
		type: Number,
		required: true,
	},
	newRecovered: {
		type: Number,
		required: true,
	},
	totalRecovered: {
		type: Number,
		required: true,
	},
});

const Country = mongoose.model("Country", countrySchema, "countryresults");

module.exports = Country;
