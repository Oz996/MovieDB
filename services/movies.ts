import { Genre, Image, Movie, Result, Similar, Trailer } from "@/types";
import { options } from "./all";
import { QueryData } from "@/app/movies/page";

export const getMovies = async (queryData: QueryData) => {
  const { sort, fromDate, toDate, genres } = queryData;
  const joinedGenres = genres?.join(",");
  try {
    const res = await fetch(
      //&with_genres=37,28
      `https://api.themoviedb.org/3/discover/movie?sort_by=${sort}&primary_release_date.gte=${fromDate}&primary_release_date.lte=${toDate}&with_genres=${joinedGenres}`,
      options
    );
    const data = await res.json();
    const results = data.results as Result[];
    return results;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getGenres = async () => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list`,
      options
    );
    const data = await res.json();
    const results = data.genres as Genre[];
    return results;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getMovieList = async (type: string = "now_playing") => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${type}`,
      options
    );
    const data = await res.json();
    const results = data.results as Result[];
    return results;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getMovieTrending = async (time: string = "week") => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/movie/${time}`,
      options
    );
    const data = await res.json();
    const results = data.results as Result[];
    return results;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getMovieDetails = async (id: string | number) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits,keywords,external_ids,reviews`,
      options
    );
    const result = (await res.json()) as Movie;
    return result;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getMovieVideos = async (id: string | number) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos`,
      options
    );
    const data = await res.json();
    const results = data.results as Trailer[];
    return results;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getMovieImages = async (id: string | number) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/images`,
      options
    );
    const data = await res.json();
    const results = data.posters as Image[];
    return results;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getMovieSimilar = async (id: string | number) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar`,
      options
    );
    const data = await res.json();
    const results = data.results as Similar[];
    return results;
  } catch (error: any) {
    console.error(error.message);
  }
};
