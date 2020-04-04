const axios = require("axios");
const async = require("async");
let Country = require("../models/country.model");

exports.country_update = function (req, res) {
	let results = [];
	axios
		.get("https://api.covid19api.com/summary")
		.then((response) => {
			for (let k in response.data.Countries) {
				const countryResult = {
					country: response.data.Countries[k].Country,
					countryCode: response.data.Countries[k].CountryCode,
					countrySlug: response.data.Countries[k].Slug,
					newCases: response.data.Countries[k].NewConfirmed,
					totalCases: response.data.Countries[k].TotalConfirmed,
					newDeaths: response.data.Countries[k].NewDeaths,
					totalDeaths: response.data.Countries[k].TotalDeaths,
					newRecovered: response.data.Countries[k].NewRecovered,
					totalRecovered: response.data.Countries[k].TotalRecovered,
				};
				results.push(countryResult);
			}

			async.eachSeries(
				results,
				function updateObject(obj, done) {
					Country.updateOne(
						{
							country: obj.country,
						},
						{
							countryCode: obj.countryCode,
							countrySlug: obj.countrySlug,
							newCases: obj.newCases,
							totalCases: obj.totalCases,
							newDeaths: obj.newDeaths,
							totalDeaths: obj.totalDeaths,
							newRecovered: obj.newRecovered,
							totalRecovered: obj.totalRecovered,
						},
						{
							upsert: true,
						},
						done
					);
				},
				function allDone(error) {
					if (error) {
						console.log(error);
					} else {
						res.sendStatus(200);
					}
				}
			);
		})
		.catch((error) => {
			console.log(error);
		});
};
