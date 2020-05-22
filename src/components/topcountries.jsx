import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { numberWithCommas } from "../Utils";

const Country = (props) => (
	<div className="row topcountries-info">
		<Link to={`/countries/${props.country.country}`} className="link">
			<div className="col-md">
				<div className="row">
					<div className="col-md">{props.country.country}</div>
				</div>
				<div className="row">
					<div className="col-md">
						<img
							src={`https://disease.sh/assets/img/flags/${props.country.countryCode.toLowerCase()}.png`}
							className="img-fluid rounded topcountries-img"
							alt={props.country.country}
						/>
					</div>
					<div className="col-md">
						Cases: <br />
						{props.country.confirmed}
					</div>
					<div className="col-md">
						Deaths: <br />
						{props.country.deaths}
					</div>
					<div className="col-md">
						Recovered: <br />
						{props.country.recovered}
					</div>
				</div>
			</div>
		</Link>
	</div>
);

export default class TopCountries extends Component {
	constructor(props) {
		super(props);

		this.state = { countries: [] };
	}

	componentDidMount() {
		axios
			.get("http://localhost:5000/countries/limit/10")
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

	countryList(countries) {
		return countries.map((currentcountry) => {
			return (
				<Country country={currentcountry} key={currentcountry._id} />
			);
		});
	}

	render() {
		return <div>{this.countryList(this.state.countries)}</div>;
	}
}
