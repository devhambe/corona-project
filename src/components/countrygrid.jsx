import React, { Component } from "react";
import Loading from "./loading";
import { Link } from "react-router-dom";
import axios from "axios";

const Country = (props) => (
	<div className="country-column col-md-3 column">
		<Link to={`/countries/${props.country.country}`} className="link">
			<img
				src={`https://disease.sh/assets/img/flags/${props.country.countryCode.toLowerCase()}.png`}
				className="img-fluid"
				alt={props.country.country}
			/>
			<div>
				<h5>{props.country.country}</h5>
				<h6 className=" mb-2 text-muted">
					Total Cases: {props.country.confirmed.toLocaleString()}
				</h6>
				<h6 className=" mb-2 text-muted">
					Total Deaths: {props.country.deaths.toLocaleString()}
				</h6>
				<h6 className=" mb-2 text-muted">
					Total Recovered: {props.country.recovered.toLocaleString()}
				</h6>
				<h6 className=" mb-2 text-muted">
					Active Cases: {props.country.active.toLocaleString()}
				</h6>
			</div>
		</Link>
	</div>
);

export default class CountryGrid extends Component {
	constructor(props) {
		super(props);

		this.state = {
			countries: [],
			search: "",
			filter: "confirmed",
		};
	}

	componentDidMount() {
		this.updateCountries();
	}

	updateCountries() {
		axios
			.get(`http://localhost:5000/countries/filter/${this.state.filter}`)
			.then((res) => {
				this.setState({ countries: res.data });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	updateSearch(e) {
		this.setState({ search: e.target.value.substr(0, 20) });
	}

	updateFilter(e) {
		this.setState({ filter: e.target.value });
	}

	componentDidUpdate(prevState) {
		if (this.state.filter !== prevState.filter) {
			this.updateCountries();
		}
	}

	countryList(filteredCountries) {
		return filteredCountries.map((currentcountry) => {
			return (
				<Country country={currentcountry} key={currentcountry._id} />
			);
		});
	}

	render() {
		const filteredCountries = this.state.countries.filter(
			(currentcountry) => {
				return (
					currentcountry.country
						.toLowerCase()
						.indexOf(this.state.search.toLowerCase()) !== -1
				);
			}
		);

		if (this.state.countries.length !== 0) {
			return (
				<div className="container-fluid">
					<div className="row mt-3">
						<div className="col-md-10">
							<input
								type="text"
								className="form-control"
								placeholder="Search..."
								value={this.state.search}
								onChange={this.updateSearch.bind(this)}
							/>
						</div>
						<div className="col-md-2">
							<select
								className="form-control"
								name="country-filter"
								id="country-filter"
								onChange={this.updateFilter.bind(this)}
							>
								<option value="confirmed" defaultValue>
									Sort by cases
								</option>
								<option value="deaths">Sort by deaths</option>
								<option value="recovered">
									Sort by recovered
								</option>
								<option value="active">Sort by active</option>
							</select>
						</div>
					</div>

					<div className="row">
						{this.countryList(filteredCountries)}
					</div>
				</div>
			);
		} else {
			return <Loading />;
		}
	}
}
