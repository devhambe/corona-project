import React, { Component } from "react";
import axios from "axios";
import { numberWithCommas } from "../Utils";

export default class GlobalStats extends Component {
	state = {
		data: {},
	};

	componentDidMount() {
		axios
			.get("http://localhost:5000/global/")
			.then((res) => {
				for (let k in res.data) {
					if ((res.data[k] === parseInt(res.data[k]), 10)) {
						res.data[k] = numberWithCommas(res.data[k]);
					}
				}
				this.setState({ data: res.data });
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
							Total Cases: {this.state.data.totalConfirmed}
							<span className="badge badge-primary ml-3">
								+{this.state.data.newConfirmed}
							</span>
						</h4>
					</div>

					<div className="stat">
						<h4>
							Total Deaths: {this.state.data.totalDeaths}
							<span className="badge badge-danger ml-3">
								+{this.state.data.newDeaths}
							</span>
						</h4>
					</div>

					<div className="stat">
						<h4>
							Total Recovered: {this.state.data.totalRecovered}
							<span className="badge badge-success ml-3">
								+{this.state.data.newRecovered}
							</span>
						</h4>
					</div>

					<div className="stat">
						<h4>
							Active Cases: {this.state.data.totalActive}
							<span className="badge badge-info ml-3">
								+{this.state.data.newActive}
							</span>
						</h4>
					</div>
				</div>
			</div>
		);
	}
}
