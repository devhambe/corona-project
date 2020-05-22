import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<Link to="/" className="navbar-brand">
					Corona Project
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarContent"
					aria-controls="navbarContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse">
					<ul className="navbar-nav mr-auto">
						<li className="navbar-item">
							<Link to="/countries" className="nav-link">
								Cases by country
							</Link>
						</li>
					</ul>
				</div>
				<div className="collapse navbar-collapse">
					<ul className="navbar-nav ml-auto">
						<li className="navbar-item">
							<a
								href="https://github.com/devhambe"
								className="nav-link"
							>
								<i className="fab fa-github mr-1"></i> GitHub
							</a>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}
