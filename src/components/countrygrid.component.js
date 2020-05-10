import React, { Component } from "react";
import axios from "axios";
import { numberWithCommas } from "../Utils";

const Country = (props) => (
	<div className="country-column col-md-3 column">
		<img
			// src={`http://catamphetamine.gitlab.io/country-flag-icons/3x2/${props.country.countryCode}.svg`}
			src={`https://disease.sh/assets/img/flags/${props.country.countryCode.toLowerCase()}.png`}
			className="img-fluid"
			alt={props.country.country}
		/>
		<div className="">
			<h5 className="">{props.country.country}</h5>
			<h6 className=" mb-2 text-muted">
				Total Cases: {props.country.confirmed}
			</h6>
			<h6 className=" mb-2 text-muted">
				Total Deaths: {props.country.deaths}
			</h6>
			<h6 className=" mb-2 text-muted">
				Total Recovered: {props.country.recovered}
			</h6>
			<h6 className=" mb-2 text-muted">
				Active Cases: {props.country.active}
			</h6>
		</div>
	</div>
);

export default class CountryGrid extends Component {
	constructor(props) {
		super(props);

		this.state = { countries: [], search: "" };
	}

	componentDidMount() {
		axios
			.get("http://localhost:5000/countries/")
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
				this.setState({ countries: res.data });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	updateSearch(e) {
		this.setState({ search: e.target.value.substr(0, 20) });
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

		return (
			<div className="container-fluid">
				<input
					type="text"
					className="form-control mt-2"
					placeholder="Search"
					value={this.state.search}
					onChange={this.updateSearch.bind(this)}
				/>
				<div className="row">{this.countryList(filteredCountries)}</div>
			</div>
		);
	}
}
