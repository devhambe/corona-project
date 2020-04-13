const router = require("express").Router();
const Global = require("../models/global.model");

router.get("/", (req, res) => {
	Global.findOne({ name: "global" })
		.then((result) => {
			res.json(result);
		})
		.catch((error) => {
			res.status(400).json(`Error: ${error}`);
		});
});

module.exports = router;
