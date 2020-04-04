import React, { Component } from "react";
import axios from "axios";

const Country = (props) => (
	<div className="country-column col-md-3 clearfix">
		<img
			src={`http://catamphetamine.gitlab.io/country-flag-icons/3x2/${props.country.countryCode}.svg`}
			className="img-fluid"
			alt={props.country.country}
		></img>
		<div className="">
			<h5 className="">{props.country.country}</h5>
			<h6 className=" mb-2 text-muted">
				Total Cases: {props.country.totalCases}
			</h6>
			<h6 className=" mb-2 text-muted">
				Total Deaths: {props.country.totalDeaths}
			</h6>
			<h6 className=" mb-2 text-muted">
				Total Recovered: {props.country.totalRecovered}
			</h6>
			<h6 className=" mb-2 text-muted">
				Active Cases:{" "}
				{props.country.totalCases -
					(props.country.totalDeaths + props.country.totalRecovered)}
			</h6>
		</div>
	</div>
);

export default class CountryGrid extends Component {
	constructor(props) {
		super(props);

		this.state = { countries: [] };
	}

	componentDidMount() {
		axios
			.get("http://localhost:5000/countries/")
			.then((response) => {
				this.setState({ countries: response.data });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	countryList() {
		return this.state.countries.map((currentcountry) => {
			return (
				<Country country={currentcountry} key={currentcountry._id} />
			);
		});
	}

	render() {
		return (
			<div className="row">
				{this.countryList()}
				{/* TODO country filter */}
			</div>
		);
	}
}
