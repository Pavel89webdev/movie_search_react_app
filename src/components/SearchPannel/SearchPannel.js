import React from "react";
import PropTypes from "prop-types";
import { Input } from "antd";

import "./SearchPannel.sass";

function SearchPannel({ changeInput }) {
	return (
		<Input
			className="search-pannel"
			placeholder="Search"
			onChange={(e) => {
				changeInput(e.target.value);
			}}
		/>
	);
}

SearchPannel.propTypes = {
	changeInput: PropTypes.func,
};

SearchPannel.defaultProps = {
	changeInput: (f) => f,
};

export default SearchPannel;
