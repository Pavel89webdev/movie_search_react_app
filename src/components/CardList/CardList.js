import React, { Component } from "react";
import { v4 } from "uuid";
import CardItem from "../CardItem";
import MovieService from "../../services/MovieService";

const movieService = new MovieService();

export default class CardList extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.getMovie();
	}

	getMovie = () =>
		movieService.findMovie("return").then((data) => {
			// eslint-disable-next-line no-console
			console.log(data);
			this.setMoviesToState(data.results);
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
		const { movies } = this.state;

		if (movies) {
			return <>{this.createCardsArr(movies)}</>;
		}
		return <h1>Loading...</h1>;
	}
}
