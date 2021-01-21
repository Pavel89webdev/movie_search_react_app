import React from "react";
import PropTypes from "prop-types";

import SearchPannel from "../SearchPannel";
import LoadingMessage from "../LoadingMessage";
import CardList from "../CardList";
import NoResultMessage from "../NoResultMessage";
import ErrorMessage from "../ErrorMessage";
import PaginationBar from "../PaginationBar";

function SearchPage({
	updateInput,
	loading,
	haveResult,
	movies,
	error,
	searchQuery,
	changeCurrentPage,
	totalItems,
	ratedMovies,
}) {
	return (
		<div className="container container--fill-height">
			<div className="container container--max-width">
				<SearchPannel
					changeInput={(value) => {
						updateInput(value);
					}}
				/>
			</div>
			<main className="container container--max-width">
				{loading && <LoadingMessage />}
				{haveResult && (
					<CardList movies={movies} ratedMovies={ratedMovies} />
				)}
				{!haveResult && !loading && !error && (
					<NoResultMessage searchQuery={searchQuery} />
				)}
				{error && <ErrorMessage error={error} />}
			</main>
			<div className="container container--max-width">
				<PaginationBar
					onChange={(newPage) => {
						changeCurrentPage(newPage);
					}}
					totalItems={totalItems}
				/>
			</div>
		</div>
	);
}

SearchPage.defaultProps = {
	updateInput: (f) => f,
	loading: false,
	haveResult: false,
	movies: [],
	ratedMovies: [],
	error: false,
	searchQuery: "",
	changeCurrentPage: (f) => f,
	totalItems: 1,
};

SearchPage.propTypes = {
	updateInput: PropTypes.func,
	loading: PropTypes.bool,
	haveResult: PropTypes.bool,
	movies: PropTypes.array,
	ratedMovies: PropTypes.array,
	error: PropTypes.bool,
	searchQuery: PropTypes.string,
	changeCurrentPage: PropTypes.func,
	totalItems: PropTypes.number,
};

export default SearchPage;
