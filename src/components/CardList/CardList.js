import React, { Component } from "react";
import { v4 } from "uuid";
import { Spin } from "antd";
import CardItem from "../CardItem";
import MovieService from "../../services/MovieService";

import "./CardList.sass";

const movieService = new MovieService();

export default class CardList extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.getMovie();
	}

	getMovie = () =>
		movieService
			.findMovie("return")
			.then((data) => {
				// eslint-disable-next-line no-console
				console.log(data);
				this.setMoviesToState(data.results);
			})
			.catch((e) => {
				// eslint-disable-next-line no-console
				console.log(e);
				this.setState(() => ({ error: e.message }));
			});

	setMoviesToState = (resultsArr) => {
		const newState = {
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
		const { movies, error } = this.state;

		if (movies) {
			return <>{this.createCardsArr(movies)}</>;
		}
		if (error) {
			return <div className="status">{error}</div>;
		}
		return (
			<div className="status">
				<Spin size="large" tip="Loading..." />
			</div>
		);
	}
}
