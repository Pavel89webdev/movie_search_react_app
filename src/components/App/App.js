import React, { Component } from "react";

import Main from "../Main";
import SearchPannel from "../SearchPannel";
import PaginationBar from "../PaginationBar";

import "./App.sass";

class App extends Component {
	state = {
		searchQuery: "return",
		currentPage: 1,
	};

	updateInput(value) {
		this.setState(() => ({
			searchQuery: value,
		}));
	}

	changeCurrentPage(newPage) {
		this.setState(() => ({
			currentPage: newPage,
		}));
	}

	render() {
		const { searchQuery, currentPage } = this.state;

		return (
			<div className="container container--max-width">
				<SearchPannel
					changeInput={(value) => {
						this.updateInput(value);
					}}
				/>
				<Main searchQuery={searchQuery} currentPage={currentPage} />
				<PaginationBar
					onChange={(newPage) => {
						this.changeCurrentPage(newPage);
					}}
					totalPages={60}
				/>
			</div>
		);
	}
}

export default App;
