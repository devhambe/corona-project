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
		.get("https://corona.lmao.ninja/v2/countries")
		.then((res) => {
			// console.log(res.data);
			for (let k in res.data) {
				if (res.data[k].countryInfo.iso2 == null) {
					switch (res.data[k].country) {
						case "MS Zaandam":
							res.data[k].countryInfo.iso2 = "NL";
							break;
						case "Diamond Princess":
							res.data[k].countryInfo.iso2 = "GB";
							break;
					}
				}

				const countryResult = {
					country: res.data[k].country,
					countryCode: res.data[k].countryInfo.iso2,
					lat: res.data[k].countryInfo.lat,
					lng: res.data[k].countryInfo.long,
					confirmed: res.data[k].cases,
					deaths: res.data[k].deaths,
					recovered: res.data[k].recovered,
					critical: res.data[k].critical,
					active: res.data[k].active,
					lastUpdate: res.data[k].updated,
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
							lat: obj.lat,
							lng: obj.lng,
							confirmed: obj.confirmed,
							deaths: obj.deaths,
							recovered: obj.recovered,
							active: obj.active,
							critical: obj.critical,
							lastUpdate: obj.lastUpdate,
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
