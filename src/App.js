import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.css";
import "./App.css";

import Navbar from "./components/navbar";
import CountryGrid from "./components/countrygrid";
import HomePage from "./components/homepage";
import CountryStats from "./components/countrystats";

function App() {
	return (
		<Router>
			<Navbar />
			<Route path="/" component={HomePage} exact />
			<Route path="/countries" component={CountryGrid} exact />
			<Route path="/countries/:name" component={CountryStats} exact />
		</Router>
	);
}

export default App;
