import { Genre, Image, Movie, Result, Similar } from "@/types";
import options from "./options";
import { tmdbURL } from "./options";

export const getMovies = async (query: string): Promise<Movie[]> => {
  try {
    const res = await fetch(
      tmdbURL + `discover/movie?include_adult=false&region=US&${query}`,
      options
    );
    const data = await res.json();
    const results = data.results;
    return results;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const getMovieGenres = async (): Promise<Genre[]> => {
  try {
    const res = await fetch(tmdbURL + `genre/movie/list`, options);
    const data = await res.json();
    const results = data.genres;
    return results;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const getMovieList = async (
  type: string = "now_playing"
): Promise<Movie[]> => {
  try {
    const res = await fetch(tmdbURL + `movie/${type}`, options);
    const data = await res.json();
    const results = data.results;
    return results;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const getMovieTrending = async (
  time: string = "week"
): Promise<Result[]> => {
  try {
    const res = await fetch(tmdbURL + `trending/movie/${time}`, options);
    const data = await res.json();
    const results = data.results;
    return results;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const getMovieDetails = async (id: string | number): Promise<Movie> => {
  try {
    const res = await fetch(
      tmdbURL +
        `movie/${id}?append_to_response=credits,keywords,external_ids,reviews,videos`,
      options
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const getMovieImages = async (id: string | number): Promise<Image[]> => {
  try {
    const res = await fetch(tmdbURL + `movie/${id}/images`, options);
    const data = await res.json();
    const results = data.posters;
    return results;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const getMovieSimilar = async (
  id: string | number
): Promise<Similar[]> => {
  try {
    const res = await fetch(tmdbURL + `movie/${id}/similar`, options);
    const data = await res.json();
    const results = data.results;
    return results;
  } catch (error: any) {
    throw Error(error.message);
  }
};
