import React from "react";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import { Typography } from "antd";
import parse from "date-fns/parse";
import format from "date-fns/format";

import TextCutter from "../../services/TextCutter";
import "./CardItem.sass";

function CardItem({ title, realeseDate, genresIds, coverPath, description }) {
	const { Title, Text } = Typography;
	const textcutter = new TextCutter(description);
	const descriptionToRender = textcutter.cut(180);

	const dateString = parse(realeseDate, "yyyy-MM-dd", new Date());
	const dateToRender = format(dateString, "MMMM d, yyyy");

	const genres = (genresArr) =>
		genresArr.map((genre) => (
			<Text keyboard key={v4()}>
				{genre}
			</Text>
		));

	let posterUrl = false;

	if (coverPath) {
		posterUrl = `https://image.tmdb.org/t/p/w500/${coverPath}`;
	}

	return (
		<div className="card card--margin-bottom">
			<div className="card__img-wrapper">
				{posterUrl && (
					<img
						className="card__img"
						src={posterUrl}
						alt="film cover"
					/>
				)}

				{!posterUrl && (
					<span className="card__img card__img--no-data">
						&#10067;
					</span>
				)}
			</div>
			<div className="card__header__text-block">
				<Title level={4}>{title}</Title>
				<Text type="secondary">{dateToRender}</Text>
				<div className="card__genres">{genres(genresIds)}</div>
			</div>
			<div className="card__description">
				<Text>{descriptionToRender}</Text>
			</div>
		</div>
	);
}

CardItem.propTypes = {
	title: PropTypes.string,
	realeseDate: PropTypes.string,
	genresIds: PropTypes.array,
	coverPath: PropTypes.string,
	description: PropTypes.string,
};

CardItem.defaultProps = {
	title: "no title",
	realeseDate: "no data",
	genresIds: [],
	coverPath: "no img url",
	description: "no description",
};

export default CardItem;
