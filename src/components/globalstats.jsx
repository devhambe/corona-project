import React, { Component } from "react";
import axios from "axios";
import { numberWithCommas } from "../Utils";

const StatsColumn = (props) => (
	<div className="stat col-md-3 column">
		<h4>
			<p>{props.title}</p>
			<p>{props.total}</p>
			<span className={`badge badge-${props.color}`}>
				{props.new} today
			</span>
			<div className="progress mx-3 mt-3">
				<div className={`progress-bar bg-${props.color} w-100`}></div>
			</div>
		</h4>
	</div>
);

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
				<StatsColumn
					title="Total Cases"
					total={this.state.data.totalConfirmed}
					new={this.state.data.newConfirmed}
					color="primary"
				/>

				<StatsColumn
					title="Total Deaths"
					total={this.state.data.totalDeaths}
					new={this.state.data.newDeaths}
					color="danger"
				/>

				<StatsColumn
					title="Total Recovered"
					total={this.state.data.totalRecovered}
					new={this.state.data.newRecovered}
					color="success"
				/>

				<StatsColumn
					title="Total Active"
					total={this.state.data.totalActive}
					new={this.state.data.newActive}
					color="info"
				/>
			</div>
		);
	}
}
