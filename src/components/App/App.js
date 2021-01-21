import React, { Component } from "react";
import debounce from "lodash.debounce";
import { Tabs } from "antd";

import SearchPage from "../SearchPage";
import RatedPage from "../RatedPage";

import MovieService from "../../services/MovieService";
import Context from "../MovieSeviceContext/MovieSeviceContext";

import "./App.sass";

class App extends Component {
	state = {
		searchQuery: "return",
		movies: [],
		ratedMovies: [],
		currentPage: 1,
		loading: true,
		error: false, //	error.mesage == string
		totalItems: 0,
	};

	movieService = new MovieService();

	genres;

	debounceUpdateMovie = debounce((text, page) => {
		this.updateMovies(text, page);
	}, 1000);

	componentDidMount() {
		if (sessionStorage.getItem("guestSessionId")) {
			this.movieService.setGuestSessionId(
				sessionStorage.getItem("guestSessionId")
			);
		}

		if (!sessionStorage.getItem("guestSessionId")) {
			this.movieService.createNewGuestSession();
		}

		const { searchQuery, currentPage } = this.state;
		this.setState(() => ({
			loading: true,
		}));

		this.movieService.getGenres().then((genres) => {
			this.genres = genres;
		});
		this.updateMovies(searchQuery, currentPage);
		this.setRatedMoviesToState();
	}

	componentDidUpdate() {
		// eslint-disable-next-line no-console
		console.log("update");
	}

	setRatedMoviesToState() {
		this.movieService.getRatedMovies().then((ratedMovies) => {
			this.setState({
				ratedMovies: ratedMovies.results,
			});
		});
	}

	updateMovies(searchQuery, page) {
		this.movieService
			.findMovie(searchQuery, page)
			.then((data) => {
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
		const {
			movies,
			ratedMovies,
			totalItems,
			error,
			loading,
			searchQuery,
		} = this.state;

		const { TabPane } = Tabs;

		const haveResult = !!movies.length;

		const searchPage = () => (
			<SearchPage
				updateInput={(value) => {
					this.updateInput(value);
				}}
				loading={loading}
				haveResult={haveResult}
				movies={movies}
				ratedMovies={ratedMovies}
				error={error}
				searchQuery={searchQuery}
				changeCurrentPage={(newPage) => {
					this.changeCurrentPage(newPage);
				}}
				totalItems={totalItems}
			/>
		);

		const ratedPage = () => (
			<RatedPage
				loading={loading}
				ratedMovies={ratedMovies}
				error={error}
			/>
		);

		return (
			<Context.Provider
				value={{
					movieService: this.movieService,
					genres: this.genres,
				}}>
				<div className="container container--fill-height">
					<Tabs
						defaultActiveKey="1"
						centered
						onChange={(key) => {
							if (key === "2") this.setRatedMoviesToState();
						}}>
						<TabPane tab="Search" key="1">
							{searchPage()}
						</TabPane>
						<TabPane tab="Rated" key="2">
							{ratedPage()}
						</TabPane>
					</Tabs>
				</div>
			</Context.Provider>
		);
	}
}

export default App;
