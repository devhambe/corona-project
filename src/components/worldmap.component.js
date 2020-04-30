import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

export default class WorldMap extends Component {
	state = {
		lat: 20,
		lng: 0,
		zoom: 2,
	};

	render() {
		const position = [this.state.lat, this.state.lng];
		return (
			<div className="row">
				<div className="column col-md-3"></div>
				<div className="column col-md-9">
					<div className="world-map">
						<Map center={position} zoom={this.state.zoom}>
							<TileLayer
								attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>
						</Map>
					</div>
				</div>
			</div>
		);
	}
}
