import React, { Component } from "react";
import PropTypes from "prop-types";
import { Pagination } from "antd";

class PaginationBar extends Component {
	static defaultProps = {
		onChange: (f) => f,
		totalItems: 10,
	};

	static propTypes = {
		totalItems: PropTypes.number,
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
		const { totalItems } = this.props;

		return (
			<Pagination
				defaultPageSize={20}
				showSizeChanger={false}
				className="pagination"
				current={currentPage}
				onChange={this.onChange}
				total={totalItems}
			/>
		);
	}
}

export default PaginationBar;
