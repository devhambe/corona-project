import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

import Navbar from "./components/navbar.component";
import CountryGrid from "./components/countrygrid.component";

function App() {
	return (
		<Router>
			<Navbar />
			<Route path="/countries" component={CountryGrid} />
		</Router>
	);
}

export default App;
