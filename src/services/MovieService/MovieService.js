export default class MovieService {
	apiBase = "https://api.themoviedb.org/3/";

	apiKey = "?api_key=733f3d3b61188971a74a40a2b570a995";

	async getResourse(url) {
		const result = await fetch(url);
		const body = await result.json();
		return body;
	}

	findMovie(keyWord) {
		const queryString = `&ne-US&query=${keyWord}&page=1&include_adult=false`;
		const url = `${this.apiBase}search/movie${this.apiKey}${queryString}`;
		return this.getResourse(url);
	}
}
