import React, { Component } from "react";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import debounce from "lodash.debounce";
import { Spin, Alert } from "antd";
import CardItem from "../CardItem";
import MovieService from "../../services/MovieService";

import "./CardList.sass";

const movieService = new MovieService();

export default class CardList extends Component {
	static defaultProps = {
		searchQuery: "return",
		currentPage: 1,
	};

	static propTypes = {
		searchQuery: PropTypes.string,
		currentPage: PropTypes.number,
	};

	debounsedGetMovie = debounce(() => {
		this.getMovie.call(this);
	}, 1000);

	constructor(props) {
		super(props);
		this.state = {
			movies: [],
		};
	}

	componentDidMount() {
		this.getMovie();
	}

	componentDidUpdate(prevProps) {
		const { searchQuery } = this.props;

		if (prevProps.searchQuery !== searchQuery) {
			this.debounsedGetMovie();
		}
	}

	getMovie = () => {
		this.setState(() => ({ loading: true }));

		const { searchQuery, currentPage } = this.props;

		movieService
			.findMovie(searchQuery, currentPage)
			.then((data) => {
				this.setMoviesToState(data.results);
			})
			.catch((e) => {
				this.setState(() => ({
					loading: false,
					error: e.message,
				}));
			});
	};

	setMoviesToState = (resultsArr) => {
		const newState = {
			loading: false,
			movies: [],
		};
		resultsArr.forEach((item) => {
			const movie = {
				title: item.title,
				realeseDate: item.release_date,
				genresIds: item.genre_ids,
				coverPath: item.poster_path,
				description: item.overview,
			};

			newState.movies.push(movie);
		});
		this.setState(() => newState);
	};

	createCardsArr = (moviesArr) =>
		moviesArr.map((movie) => (
			<CardItem
				key={v4()}
				title={movie.title}
				realeseDate={movie.realeseDate}
				genresIds={movie.genresIds}
				coverPath={movie.coverPath}
				description={movie.description}
			/>
		));

	render() {
		const { movies, error, loading } = this.state;
		const { searchQuery } = this.props;

		const CardListContent = () => <>{this.createCardsArr(movies)}</>;

		const ErrorAlert = () => (
			<div className="status">
				<Alert
					message={`Something goes wrong :(    Error: ${error}`}
					type="error"
				/>
			</div>
		);

		const LoadingStatus = () => (
			<div className="status">
				<Spin size="large" tip="Loading..." />
			</div>
		);

		const NoResults = () => (
			<div className="status">
				<Alert
					message={`No results by searching: "${searchQuery}"`}
					type="error"
				/>
			</div>
		);

		const renderMovie =
			movies && !error && !loading ? <CardListContent /> : null;

		const errorAlert = error ? <ErrorAlert /> : null;

		const loadingStatus = loading ? <LoadingStatus /> : null;

		const noResults =
			movies.length === 0 && !error && !loading ? <NoResults /> : null;

		return (
			<>
				{renderMovie}
				{errorAlert}
				{loadingStatus}
				{noResults}
			</>
		);
	}
}
