const router = require("express").Router();
let Country = require("../models/country.model");
const country_controller = require("../controllers/countryController");

router.get("/", (req, res) => {
	Country.find()
		.sort({ totalCases: -1 })
		.then((countries) => {
			res.json(countries);
		})
		.catch((error) => {
			res.status(400).json(`Error: ${error}`);
		});
});

router.post("/update", country_controller.country_update);

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
