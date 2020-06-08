const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const globalSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	newConfirmed: {
		type: Number,
		required: true,
	},
	totalConfirmed: {
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
	newActive: {
		type: Number,
		required: true,
	},
	totalActive: {
		type: Number,
		required: true,
	},
});

const Global = mongoose.model("Global", globalSchema, "globalresults");

module.exports = Global;
