import React, { Component } from "react";
import PropTypes from "prop-types";
import { Pagination } from "antd";

class PaginationBar extends Component {
	static defaultProps = {
		onChange: (f) => f,
		totalPages: 10,
	};

	static propTypes = {
		totalPages: PropTypes.number,
		onChange: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = {
			currentPage: 1,
		};
	}

	onChange = (newPage) => {
		const { onChange } = this.props;

		this.setState(() => {
			onChange(newPage);

			return {
				currentPage: newPage,
			};
		});
	};

	render() {
		const { currentPage } = this.state;
		const { totalPages } = this.props;

		return (
			<Pagination
				current={currentPage}
				onChange={this.onChange}
				total={totalPages}
			/>
		);
	}
}

export default PaginationBar;
