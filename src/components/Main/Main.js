import React from "react";
import PropTypes from "prop-types";

import "./Main.sass";

import CardList from "../CardList";

function Main({ searchQuery }) {
	return <CardList searchQuery={searchQuery} />;
}

Main.defaultProps = {
	searchQuery: "return",
};

Main.propTypes = {
	searchQuery: PropTypes.string,
};

export default Main;
