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
	lat: {
		type: Number,
		required: true,
	},
	lng: {
		type: Number,
		required: true,
	},
	confirmed: {
		type: Number,
		required: true,
	},
	deaths: {
		type: Number,
		required: true,
	},
	recovered: {
		type: Number,
		required: true,
	},
	active: {
		type: Number,
		required: true,
	},
	critical: {
		type: Number,
		required: true,
	},
	lastUpdate: {
		type: Number,
		required: true,
	},
});

const Country = mongoose.model("Country", countrySchema, "countryresults");

module.exports = Country;
