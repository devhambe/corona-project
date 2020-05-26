import React, { Component } from "react";
import ReactLoading from "react-loading";

export default class Loading extends Component {
	render() {
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
