import React, { Component } from "react";
import debounce from "lodash.debounce";

import SearchPannel from "../SearchPannel";
import CardList from "../CardList";
import PaginationBar from "../PaginationBar";
import NoResultMessage from "../NoResultMessage";
import ErrorMessage from "../ErrorMessage";
import LoadingMessage from "../LoadingMessage";

import MovieService from "../../services/MovieService";

import "./App.sass";

const movieService = new MovieService();

class App extends Component {
	state = {
		searchQuery: "return",
		movies: [],
		currentPage: 1,
		loading: true,
		error: false, //	error.mesage == string
		totalItems: 0,
	};

	debounceUpdateMovie = debounce((text, page) => {
		this.updateMovies(text, page);
	}, 1000);

	componentDidMount() {
		const { searchQuery, currentPage } = this.state;
		this.setState(() => ({
			loading: true,
		}));

		this.updateMovies(searchQuery, currentPage);
	}

	updateMovies(searchQuery, page) {
		movieService
			.findMovie(searchQuery, page)
			.then((data) => {
				// eslint-disable-next-line no-console
				console.log(data);
				this.setState(() => ({
					error: false,
					searchQuery,
					movies: data.results,
					totalItems: data.total_results,
					currentPage: data.page,
					loading: false,
				}));
			})
			.catch((e) => {
				// eslint-disable-next-line no-console
				console.log(e);
				this.setState(() => ({
					searchQuery,
					movies: [],
					error: e,
				}));
			});
	}

	updateInput(value) {
		const { currentPage } = this.state;

		this.debounceUpdateMovie(value, currentPage);
	}

	changeCurrentPage(newPage) {
		const { searchQuery } = this.state;

		this.updateMovies(searchQuery, newPage);
	}

	render() {
		const { movies, totalItems, error, loading, searchQuery } = this.state;

		const haveResult = !!movies.length;

		return (
			<div className="container container--fill-height">
				<div className="container container--max-width">
					<SearchPannel
						changeInput={(value) => {
							this.updateInput(value);
						}}
					/>
				</div>
				<main className="container container--max-width">
					{loading && <LoadingMessage />}
					{haveResult && <CardList movies={movies} />}
					{!haveResult && !loading && !error && (
						<NoResultMessage searchQuery={searchQuery} />
					)}
					{error && <ErrorMessage error={error} />}
				</main>
				<div className="container container--max-width">
					<PaginationBar
						onChange={(newPage) => {
							this.changeCurrentPage(newPage);
						}}
						totalItems={totalItems}
					/>
				</div>
			</div>
		);
	}
}

export default App;
