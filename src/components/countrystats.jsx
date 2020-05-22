import React, { Component } from "react";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import axios from "axios";
import { numberWithCommas } from "../Utils";

const StatsCard = (props) => (
	<div className="col-md">
		<div className="card">
			<div className="card-body">
				<h5 className="card-title">{props.title}</h5>
				<p className="card-text">{props.stat}</p>
			</div>
		</div>
	</div>
);

const CountryBanner = (props) => (
	<div className="country-banner my-3">
		<img
			src={`https://disease.sh/assets/img/flags/${props.country.countryCode.toLowerCase()}.png`}
			className="img-fluid rounded"
			alt={props.country.country}
		/>
	</div>
);

class NearbyCountries extends Component {
	constructor(props) {
		super(props);

		this.state = { countries: [] };
	}

	updateNearby() {
		axios
			.post(
				`http://localhost:5000/countries/${this.props.country}/nearby`
			)
			.then((res) => {
				this.setState({
					countries: res.data,
				});
			});
	}

	componentDidMount() {
		this.updateNearby();
	}

	componentDidUpdate(prevProps) {
		if (this.props.country !== prevProps.country) {
			this.updateNearby();
		}
	}

	countryList() {
		return this.state.countries.map((country) => {
			return (
				<li key={country._id} className="nearby-country my-2">
					<img
						src={`https://disease.sh/assets/img/flags/${country.countryCode.toLowerCase()}.png`}
						className="img-fluid rounded img-thumbnail"
						alt={country.country}
					/>
					<Link to={`/countries/${country.country}`} className="link">
						<span className="ml-3">{country.country}</span>
					</Link>
				</li>
			);
		});
	}

	render() {
		return (
			<div className="mt-3 d-inline-block">
				<h5>Nearby Countries:</h5>
				<ul className="">{this.countryList()}</ul>
			</div>
		);
	}
}

export default class CountryStats extends Component {
	constructor(props) {
		super(props);

		this.updateCountry = this.updateCountry.bind(this);

		this.state = { country: {} };
	}

	updateCountry() {
		axios
			.get(
				`http://localhost:5000/countries/${this.props.match.params.name}`
			)
			.then((res) => {
				for (let k in res.data) {
					for (let i in res.data[k]) {
						if (
							res.data[k][i] &&
							typeof res.data[k][i] == "number"
						) {
							res.data[k][i] = numberWithCommas(res.data[k][i]);
						}
					}
				}
				this.setState({
					country: res.data[0],
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	componentDidMount() {
		this.updateCountry();
	}

	componentDidUpdate(prevProps) {
		if (this.props.match.params.name !== prevProps.match.params.name) {
			this.updateCountry();
		}
	}

	render() {
		if (this.state.country.country) {
			return (
				<div className="container-fluid">
					<CountryBanner country={this.state.country} />

					<div className="row">
						<div className="col-md text-center my-2">
							<h5>Population</h5>
							<p>{this.state.country.population}</p>
						</div>
					</div>

					<div className="row">
						<StatsCard
							title="Confirmed Cases"
							stat={this.state.country.confirmed}
						/>
						<StatsCard
							title="Deaths"
							stat={this.state.country.deaths}
						/>
						<StatsCard
							title="Recovered"
							stat={this.state.country.recovered}
						/>
						<StatsCard
							title="Active"
							stat={this.state.country.active}
						/>
						<StatsCard
							title="Critical"
							stat={this.state.country.critical}
						/>
					</div>

					<NearbyCountries country={this.state.country.country} />
				</div>
			);
		} else {
			return (
				<div className="loading">
					<ReactLoading
						type={"spin"}
						color={"#007bff"}
						height={200}
						width={200}
					/>
				</div>
			);
		}
	}
}
