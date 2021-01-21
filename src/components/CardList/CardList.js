import React from "react";
import PropTypes from "prop-types";
import CardItem from "../CardItem";

import "./CardList.sass";

function CardList({ movies, ratedMovies }) {
	const createCardsArr = (moviesArr) =>
		moviesArr.map((movie) => {
			let myRating = null;
			const ratedMovie = ratedMovies.filter(
				(rated) => rated.id === movie.id
			);
			if (ratedMovie.length !== 0) {
				myRating = ratedMovie[0].rating;
			}

			return (
				<CardItem
					key={movie.id}
					title={movie.title}
					realeseDate={movie.release_date}
					genresIds={movie.genre_ids}
					coverPath={movie.poster_path}
					description={movie.overview}
					id={movie.id}
					myRating={myRating}
					averageRating={movie.vote_average}
				/>
			);
		});

	return <>{createCardsArr(movies)}</>;
}

CardList.defaultProps = {
	movies: [],
	ratedMovies: [],
};

CardList.propTypes = {
	movies: PropTypes.array,
	ratedMovies: PropTypes.array,
};

export default CardList;
