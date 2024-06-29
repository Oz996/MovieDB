import { Movie, Result, Trailer } from "@/types";
import { options } from "./all";

export const getMovieList = async (type: string = "now_playing") => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${type}`,
      options
    );
    const data = await res.json();
    const results = data.results as Result[];
    console.log(results);
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
    console.log(results);
    return results;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getMovieDetails = async (id: number) => {
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

export const getMovieVideos = async (id: number) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos`,
      options
    );
    const data = await res.json();
    const results = data.results as Trailer[];
    console.log("videos", results);
    return results;
  } catch (error: any) {
    console.error(error.message);
  }
};
