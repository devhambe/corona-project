import React, { Component } from "react";
import TopCountries from "./topcountries.component";
import WorldMap from "./worldmap.component";
import GlobalStats from "./globalstats.component";

export default class MainPageComponents extends Component {
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
