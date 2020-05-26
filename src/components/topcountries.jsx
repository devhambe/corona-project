import React, { Component } from "react";
import Loading from "./loading";
import { Link } from "react-router-dom";
import axios from "axios";

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
						{props.country.confirmed.toLocaleString()}
					</div>
					<div className="col-md">
						Deaths: <br />
						{props.country.deaths.toLocaleString()}
					</div>
					<div className="col-md">
						Recovered: <br />
						{props.country.recovered.toLocaleString()}
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
		if (this.state.countries !== 0) {
			return <div>{this.countryList(this.state.countries)}</div>;
		} else {
			return <Loading />;
		}
	}
}
