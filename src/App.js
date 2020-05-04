import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.css";
import "./App.css";

import Navbar from "./components/navbar.component";
import CountryGrid from "./components/countrygrid.component";
import GlobalStats from "./components/globalstats.component";
import WorldMap from "./components/worldmap.component";

function App() {
	return (
		<Router>
			<Navbar />
			<Route path="/" component={GlobalStats} exact />
			<Route path="/" component={WorldMap} exact />
			<Route path="/countries" component={CountryGrid} />
		</Router>
	);
}

export default App;
