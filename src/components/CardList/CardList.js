import React, { Component } from "react";
import { v4 } from "uuid";
import { Spin, Alert, Button } from "antd";
import CardItem from "../CardItem";
import MovieService from "../../services/MovieService";

import "./CardList.sass";

const movieService = new MovieService();

export default class CardList extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.getMovie("return");
	}

	getMovie = (text) => {
		this.setState(() => ({ loading: true }));
		movieService
			.findMovie(text)
			.then((data) => {
				// eslint-disable-next-line no-console
				console.log(data);
				this.setMoviesToState(data.results);
			})
			.catch((e) => {
				// eslint-disable-next-line no-console
				console.log(e);
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

		const renderMovie =
			movies && !error && !loading ? (
				<>
					<Button
						onClick={() => this.getMovie("refresh")}
						className="refresh-button">
						Referesh items
					</Button>
					{this.createCardsArr(movies)}
				</>
			) : null;

		const errorAlert = error ? (
			<div className="status">
				<Alert
					message={`Something goes wrong :(    Error: ${error}`}
					type="error"
				/>
			</div>
		) : null;

		const loadingStatus = loading ? (
			<div className="status">
				<Spin size="large" tip="Loading..." />
			</div>
		) : null;

		return (
			<>
				{renderMovie}
				{errorAlert}
				{loadingStatus}
			</>
		);
	}
}
