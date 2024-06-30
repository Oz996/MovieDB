import { Image, Movie, Result, Similar, Trailer } from "@/types";
import { options } from "./all";

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

export const getMovieDetails = async (id: string) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits,keywords,external_ids,reviews`,
      options
    );
    const result = (await res.json()) as Movie;
    console.log("moviedata", result);
    return result;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getMovieVideos = async (id: string) => {
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

export const getMovieImages = async (id: string) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/images`,
      options
    );
    const data = await res.json();
    const results = data.posters as Image[];
    console.log("res res res", results);
    return results;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getMovieSimilar = async (id: string) => {
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
