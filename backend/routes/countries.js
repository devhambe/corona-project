const router = require("express").Router();
const Country = require("../models/country.model");

router.get("/", (req, res) => {
	Country.find()
		.sort({ totalConfirmed: -1 })
		.then((countries) => {
			res.json(countries);
		})
		.catch((error) => {
			res.status(400).json(`Error: ${error}`);
		});
});

router.get("/:id", (req, res) => {
	Country.findById(req.params.id)
		.then((country) => {
			res.json(country);
		})
		.catch((error) => {
			res.status(400).json(`Error: ${error}`);
		});
});

module.exports = router;
