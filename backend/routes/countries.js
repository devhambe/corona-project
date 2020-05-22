const router = require("express").Router();
const Country = require("../models/country.model");

router.get("/", (req, res) => {
	Country.find()
		.sort({ confirmed: -1 })
		.then((countries) => {
			res.json(countries);
		})
		.catch((error) => {
			res.status(400).json(`Error: ${error}`);
		});
});

router.get("/:name", (req, res) => {
	Country.find({ country: req.params.name })
		.then((country) => {
			res.json(country);
		})
		.catch((error) => {
			res.status(400).json(`Error: ${error}`);
		});
});

router.post("/:name/nearby", (req, res) => {
	Country.find({ country: req.params.name })
		.then((country) => {
			const countryName = country[0].country;
			const continent = country[0].continent;

			Country.find({
				continent: continent,
				country: { $not: { $eq: countryName } },
			})
				.sort({ confirmed: -1 })
				.limit(5)
				.then((countries) => {
					res.json(countries);
				})
				.catch((error) => {
					res.status(400).json(`Error: ${error}`);
				});
		})
		.catch((error) => {
			res.status(400).json(`Error: ${error}`);
		});
});

router.get("/limit/:number", (req, res) => {
	Country.find()
		.sort({ confirmed: -1 })
		.limit(parseInt(req.params.number))
		.then((countries) => {
			res.json(countries);
		})
		.catch((error) => {
			res.status(400).json(`Error: ${error}`);
		});
});

module.exports = router;
