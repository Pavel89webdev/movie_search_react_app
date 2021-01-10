export default class MovieService {
	apiBase = "https://api.themoviedb.org/3/";

	apiKey = "?api_key=733f3d3b61188971a74a40a2b570a995";

	async getResourse(url) {
		try {
			const result = await fetch(url);
			if (!result.ok) {
				throw new Error(`Error code is: ${result.status}`);
			}
			const body = await result.json();
			// eslint-disable-next-line no-console
			console.log(body);
			return body;
		} catch (e) {
			throw new Error(e);
		}
	}

	findMovie(keyWord, page) {
		const queryString = `&ne-US&query=${keyWord}&page=${page}&include_adult=false`;
		const url = `${this.apiBase}search/movie${this.apiKey}${queryString}`;
		return this.getResourse(url);
	}
}
