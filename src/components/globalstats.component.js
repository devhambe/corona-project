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
			<div className="stats-box row">
				<div className="stat col-md-3 column">
					<h4>
						<p>Total Cases</p>
						<p>{this.state.data.totalConfirmed}</p>
						<span className="badge badge-primary">
							{this.state.data.newConfirmed} today
						</span>
						<div class="progress mx-3 mt-3">
							<div class="progress-bar bg-primary w-100"></div>
						</div>
					</h4>
				</div>

				<div className="stat col-md-3 column">
					<h4>
						<p>Total Deaths</p>
						<p>{this.state.data.totalDeaths}</p>
						<span className="badge badge-danger">
							{this.state.data.newDeaths} today
						</span>
						<div class="progress mx-3 mt-3">
							<div class="progress-bar bg-danger w-100"></div>
						</div>
					</h4>
				</div>

				<div className="stat col-md-3 column">
					<h4>
						<p>Total Recovered</p>
						<p>{this.state.data.totalRecovered}</p>
						<span className="badge badge-success ml-3">
							{this.state.data.newRecovered} today
						</span>
						<div class="progress mx-3 mt-3">
							<div class="progress-bar bg-success w-100"></div>
						</div>
					</h4>
				</div>

				<div className="stat col-md-3 column">
					<h4>
						<p>Active Cases </p>
						<p>{this.state.data.totalActive}</p>
						<span className="badge badge-info ml-3">
							{this.state.data.newActive} today
						</span>
						<div class="progress mx-3 mt-3">
							<div class="progress-bar bg-info w-100"></div>
						</div>
					</h4>
				</div>
			</div>
		);
	}
}
