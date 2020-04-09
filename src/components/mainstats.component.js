import React, { Component } from "react";
import axios from "axios";
import { numberWithCommas } from "../Utils";

export default class MainStats extends Component {
	state = {
		data: {},
	};

	componentDidMount() {
		axios
			.get("https://api.covid19api.com/summary")
			.then((res) => {
				const data = res.data.Global;
				this.setState({ data });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="stats-box">
					<div className="stat">
						<h4>
							Total Cases: {this.state.data.TotalConfirmed}{" "}
							<span className="badge badge-primary">
								+{this.state.data.NewConfirmed}
							</span>
						</h4>
					</div>

					<div className="stat">
						<h4>
							Total Deaths: {this.state.data.TotalDeaths}{" "}
							<span className="badge badge-danger">
								+{this.state.data.NewDeaths}
							</span>
						</h4>
					</div>

					<div className="stat">
						<h4>
							Total Recovered: {this.state.data.TotalRecovered}{" "}
							<span className="badge badge-success">
								+{this.state.data.NewRecovered}
							</span>
						</h4>
					</div>

					<div className="stat">
						<h4>
							Active Cases:{" "}
							{this.state.data.TotalConfirmed -
								(this.state.data.TotalDeaths +
									this.state.data.TotalRecovered)}{" "}
							<span className="badge badge-info">
								+
								{this.state.data.NewConfirmed -
									(this.state.data.NewDeaths +
										this.state.data.NewRecovered)}
							</span>
						</h4>
					</div>
				</div>
			</div>
		);
	}
}
