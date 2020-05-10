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

router.get("/byId/:id", (req, res) => {
	Country.findById(req.params.id)
		.then((country) => {
			res.json(country);
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
