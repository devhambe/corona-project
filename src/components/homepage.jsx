import React, { Component } from "react";
import TopCountries from "./topcountries";
import WorldMap from "./worldmap";
import GlobalStats from "./globalstats";

export default class HomePage extends Component {
	render() {
		return (
			<div className="container-fluid">
				<GlobalStats />
				<div className="row">
					<div className="column col-md-3 topcountries">
						<TopCountries />
					</div>
					<div className="column col-md-9">
						<WorldMap />
					</div>
				</div>
			</div>
		);
	}
}
