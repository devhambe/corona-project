const axios = require("axios");
const async = require("async");
const Country = require("../models/country.model");
const Global = require("../models/global.model");

function updateGlobalResults() {
	axios
		.get("https://api.covid19api.com/summary")
		.then((res) => {
			const globalResult = {
				name: "global",
				newConfirmed: res.data.Global.NewConfirmed,
				totalConfirmed: res.data.Global.TotalConfirmed,
				newDeaths: res.data.Global.NewDeaths,
				totalDeaths: res.data.Global.TotalDeaths,
				newRecovered: res.data.Global.NewRecovered,
				totalRecovered: res.data.Global.TotalRecovered,
			};

			globalResult.newActive =
				globalResult.newConfirmed -
				(globalResult.newDeaths + globalResult.newRecovered);

			globalResult.totalActive =
				globalResult.totalConfirmed -
				(globalResult.totalDeaths + globalResult.totalRecovered);

			console.log(globalResult);
			Global.updateOne(
				{
					name: globalResult.name,
				},
				{
					newConfirmed: globalResult.newConfirmed,
					totalConfirmed: globalResult.totalConfirmed,
					newDeaths: globalResult.newDeaths,
					totalDeaths: globalResult.totalDeaths,
					newRecovered: globalResult.newRecovered,
					totalRecovered: globalResult.totalRecovered,
					newActive: globalResult.newActive,
					totalActive: globalResult.totalActive,
				},
				{
					upsert: true,
				},
				function (error) {
					if (error) {
						console.log(error);
					} else {
						return true;
					}
				}
			);
		})
		.catch((error) => {
			console.log(error);
		});
}

function updateCountryResults() {
	let results = [];
	axios
		.get("https://api.covid19api.com/summary")
		.then((res) => {
			for (let k in res.data.Countries) {
				const countryResult = {
					country: res.data.Countries[k].Country,
					countryCode: res.data.Countries[k].CountryCode,
					countrySlug: res.data.Countries[k].Slug,
					newConfirmed: res.data.Countries[k].NewConfirmed,
					totalConfirmed: res.data.Countries[k].TotalConfirmed,
					newDeaths: res.data.Countries[k].NewDeaths,
					totalDeaths: res.data.Countries[k].TotalDeaths,
					newRecovered: res.data.Countries[k].NewRecovered,
					totalRecovered: res.data.Countries[k].TotalRecovered,
				};
				countryResult.newActive =
					countryResult.newConfirmed -
					(countryResult.newDeaths + countryResult.newRecovered);

				countryResult.totalActive =
					countryResult.totalConfirmed -
					(countryResult.totalDeaths + countryResult.totalRecovered);

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
							newConfirmed: obj.newConfirmed,
							totalConfirmed: obj.totalConfirmed,
							newDeaths: obj.newDeaths,
							totalDeaths: obj.totalDeaths,
							newRecovered: obj.newRecovered,
							totalRecovered: obj.totalRecovered,
							newActive: obj.newActive,
							totalActive: obj.totalActive,
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
						return true;
					}
				}
			);
		})
		.catch((error) => {
			console.log(error);
		});
}

module.exports = { updateCountryResults, updateGlobalResults };
