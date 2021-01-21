export default class MovieService {
	apiBase = "https://api.themoviedb.org/3/";

	apiKey = "?api_key=733f3d3b61188971a74a40a2b570a995";

	guestSessionId;

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

	getGenres() {
		const url = `${this.apiBase}genre/movie/list${this.apiKey}`;
		return this.getResourse(url);
	}

	findMovie(keyWord, page) {
		const queryString = `&ne-US&query=${keyWord}&page=${page}&include_adult=false`;
		const url = `${this.apiBase}search/movie${this.apiKey}${queryString}`;
		return this.getResourse(url);
	}

	setGuestSessionId(guestSessoinId) {
		this.guestSessionId = guestSessoinId;
	}

	createNewGuestSession() {
		const url = `${this.apiBase}authentication/guest_session/new${this.apiKey}`;
		this.getResourse(url).then((response) => {
			this.setGuestSessionId(response.guest_session_id);
			sessionStorage.setItem("guestSessionId", this.guestSessionId);
			return response;
		});
	}

	async rateMovie(id, value) {
		const url = `${this.apiBase}movie/${id}/rating${this.apiKey}&guest_session_id=${this.guestSessionId}`;
		try {
			const rateResult = await fetch(url, {
				method: "POST",
				api_key: this.apiKey,
				movie_id: id,
				body: JSON.stringify({ value }),
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				},
			});
			if (!rateResult.ok) {
				throw new Error(
					`Status is not OK, status: ${rateResult.status}`
				);
			}
			const body = await rateResult.json();
			// eslint-disable-next-line no-console
			console.log(body);
			return body;
		} catch (e) {
			// eslint-disable-next-line no-console
			return console.log(`Error in MovieService: ${e}`);
		}
	}

	async getRatedMovies() {
		const url = `${this.apiBase}guest_session/${this.guestSessionId}/rated/movies${this.apiKey}`;
		try {
			const response = await fetch(url);
			const ratedMovies = await response.json();
			return ratedMovies;
		} catch (e) {
			// eslint-disable-next-line no-console
			return console.log(`Error in MovieService: ${e}`);
		}
	}
}
