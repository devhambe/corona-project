import React, { Component } from "react";
import Loading from "./loading";
import axios from "axios";
import L from "leaflet";
import { Map, TileLayer, GeoJSON, LayerGroup } from "react-leaflet";

export default class WorldMap extends Component {
	state = {
		lat: 20,
		lng: 0,
		zoom: 2,
	};

	componentDidMount() {
		axios
			.post("http://localhost:5000/mapbox_key/")
			.then((res) => {
				this.setState({ mapboxKey: res.data });
			})
			.catch((error) => {
				console.log(error);
			});

		axios
			.get("http://localhost:5000/countries/")
			.then((res) => {
				this.setState({ countries: res.data });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		const position = [this.state.lat, this.state.lng];

		if (this.state.countries) {
			const geoJson = {
				type: "FeatureCollection",
				features: this.state.countries.map((country = {}) => {
					return {
						type: "Feature",
						properties: {
							country,
						},
						geometry: {
							type: "Point",
							coordinates: [country.lng, country.lat],
						},
					};
				}),
			};

			return (
				<div className="world-map">
					<Map center={position} zoom={this.state.zoom}>
						<TileLayer
							attribution='&amp;copy <a href="https://www.mapbox.com/">Mapbox</a> contributors'
							url={`https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/{z}/{x}/{y}?access_token=${this.state.mapboxKey}`}
						/>
						<LayerGroup>
							<GeoJSON
								data={geoJson}
								pointToLayer={function (feature, latlng) {
									return L.circleMarker(latlng, {
										radius: 10,
										color: "#007bff",
									});
								}}
								onEachFeature={function (data, layer) {
									layer.bindPopup(
										`
											<div class="country-popup">
												<h5>${data.properties.country.country}</h5>
												<ul class="list-unstyled">
													<li><strong>Cases:</strong> ${data.properties.country.confirmed.toLocaleString()}</li>
													<li><strong>Deaths:</strong> ${data.properties.country.deaths.toLocaleString()}</li>
													<li><strong>Recovered:</strong> ${data.properties.country.recovered.toLocaleString()}</li>
													<li><strong>Active:</strong> ${data.properties.country.active.toLocaleString()}</li>
													<li><strong>Critical:</strong> ${data.properties.country.critical.toLocaleString()}</li>
												</ul>
											</div>
											`
									);
								}}
							/>
						</LayerGroup>
					</Map>
				</div>
			);
		} else {
			return <Loading />;
		}
	}
}
