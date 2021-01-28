import React, { Component } from "react";
import debounce from "lodash.debounce";
import { Tabs } from "antd";

import SearchPage from "../SearchPage";
import RatedPage from "../RatedPage";

import movieService from "../../services/MovieService";
import updateGuestSession from "../../services/updateGuestSession";
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

	genres;

	debounceUpdateMovie = debounce((text, page) => {
		this.updateMovies(text, page);
	}, 1000);

	componentDidMount() {
		const { searchQuery, currentPage } = this.state;
		this.setState(() => ({
			loading: true,
		}));

		movieService.getGenres().then((genres) => {
			this.genres = genres;
		});

		if (updateGuestSession()) {
			this.updateMovies(searchQuery, currentPage);
		}
	}

	componentDidCatch(e) {
		this.setError(e);
	}

	setRatedMoviesToState() {
		movieService.getRatedMovies().then((ratedMovies) => {
			if (ratedMovies) {
				this.setState({
					ratedMovies: ratedMovies.results,
				});
			}
		});
	}

	setError(e) {
		this.setState(() => ({
			error: e,
		}));
	}

	updateMovies(searchQuery, page) {
		movieService
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
				this.setError(e);
				this.setState(() => ({
					searchQuery,
					movies: [],
				}));
			});
	}

	updateInput(value) {
		const { currentPage } = this.state;

		this.setState(() => ({
			searchQuery: value,
		}));

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
					movieService,
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
