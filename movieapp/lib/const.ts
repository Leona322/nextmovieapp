export const API = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
export const URL =`${BASE_URL}/movie/popular?api_key=${API}`;

export const S_URL = `${BASE_URL}/search/movie?api_key=${API}}`;