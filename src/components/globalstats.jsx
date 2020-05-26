import React, { Component } from "react";
import Loading from "./loading";
import axios from "axios";

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
	constructor(props) {
		super(props);

		this.state = { data: {} };
	}

	componentDidMount() {
		axios
			.get("http://localhost:5000/global/")
			.then((res) => {
				this.setState({ data: res.data });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		if (this.state.data.totalConfirmed) {
			return (
				<div className="stats-box row">
					<StatsColumn
						title="Total Cases"
						total={this.state.data.totalConfirmed.toLocaleString()}
						new={this.state.data.newConfirmed.toLocaleString()}
						color="primary"
					/>

					<StatsColumn
						title="Total Deaths"
						total={this.state.data.totalDeaths.toLocaleString()}
						new={this.state.data.newDeaths.toLocaleString()}
						color="danger"
					/>

					<StatsColumn
						title="Total Recovered"
						total={this.state.data.totalRecovered.toLocaleString()}
						new={this.state.data.newRecovered.toLocaleString()}
						color="success"
					/>

					<StatsColumn
						title="Total Active"
						total={this.state.data.totalActive.toLocaleString()}
						new={this.state.data.newActive.toLocaleString()}
						color="warning"
					/>
				</div>
			);
		} else {
			return <Loading />;
		}
	}
}
