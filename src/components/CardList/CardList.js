import React from "react";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import CardItem from "../CardItem";

import "./CardList.sass";

function CardList({ movies }) {
	const createCardsArr = (moviesArr) =>
		moviesArr.map((movie) => (
			<CardItem
				key={v4()}
				title={movie.title}
				realeseDate={movie.release_date}
				genresIds={movie.genre_ids}
				coverPath={movie.poster_path}
				description={movie.overview}
			/>
		));

	return <>{createCardsArr(movies)}</>;
}

CardList.defaultProps = {
	movies: [],
};

CardList.propTypes = {
	movies: PropTypes.array,
};

export default CardList;
